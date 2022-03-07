terraform {
  backend "http" {
  }
  required_providers {
    oci = {
      source = "hashicorp/oci"
    }
  }
}

data "oci_identity_availability_domains" "ads" {
  compartment_id = var.TENANCY_OCID
}

data "oci_artifacts_container_configuration" "container_registry" {
  compartment_id = var.TENANCY_OCID
}

module "vcn" {
  source  = "oracle-terraform-modules/vcn/oci"
  version = "3.1.0"

  compartment_id = var.TENANCY_OCID
  region         = var.REGION

  internet_gateway_route_rules = null
  local_peering_gateways       = null
  nat_gateway_route_rules      = null

  vcn_name      = "fbpviewer-vcn"
  vcn_dns_label = "fbpviewervcn"
  vcn_cidrs     = ["10.0.0.0/16"]

  create_internet_gateway = true
  create_nat_gateway      = true
  create_service_gateway  = true
}

resource "oci_core_security_list" "private_subnet_sl" {
  compartment_id = var.TENANCY_OCID
  vcn_id         = module.vcn.vcn_id

  display_name = "fbpviewer-private-subnet-sl"

  egress_security_rules {
    stateless        = false
    destination      = "0.0.0.0/0"
    destination_type = "CIDR_BLOCK"
    protocol         = "all"
  }

  ingress_security_rules {
    stateless   = false
    source      = "10.0.0.0/16"
    source_type = "CIDR_BLOCK"
    protocol    = "all"
  }
}

resource "oci_core_security_list" "public_subnet_sl" {
  compartment_id = var.TENANCY_OCID
  vcn_id         = module.vcn.vcn_id

  display_name = "fbpviewer-public-subnet-sl"

  egress_security_rules {
    stateless        = false
    destination      = "0.0.0.0/0"
    destination_type = "CIDR_BLOCK"
    protocol         = "all"
  }

  ingress_security_rules {
    stateless   = false
    source      = "10.0.0.0/16"
    source_type = "CIDR_BLOCK"
    protocol    = "all"
  }

  ingress_security_rules {
    stateless   = false
    source      = "0.0.0.0/0"
    source_type = "CIDR_BLOCK"
    protocol    = "6"
    tcp_options {
      min = 6443
      max = 6443
    }
  }

  ingress_security_rules {
    stateless   = false
    source      = "0.0.0.0/0"
    source_type = "CIDR_BLOCK"
    protocol    = "6"
    tcp_options {
      min = 80
      max = 80
    }
  }

  ingress_security_rules {
    stateless   = false
    source      = "0.0.0.0/0"
    source_type = "CIDR_BLOCK"
    protocol    = "6"
    tcp_options {
      min = 443
      max = 443
    }
  }
}

resource "oci_core_subnet" "vcn_private_subnet" {
  compartment_id = var.TENANCY_OCID
  vcn_id         = module.vcn.vcn_id
  cidr_block     = "10.0.1.0/24"

  route_table_id             = module.vcn.nat_route_id
  security_list_ids          = [oci_core_security_list.private_subnet_sl.id]
  display_name               = "fbpviewer-private-subnet"
  prohibit_public_ip_on_vnic = true
}

resource "oci_core_subnet" "vcn_public_subnet" {
  compartment_id = var.TENANCY_OCID
  vcn_id         = module.vcn.vcn_id
  cidr_block     = "10.0.0.0/24"

  route_table_id    = module.vcn.ig_route_id
  security_list_ids = [oci_core_security_list.public_subnet_sl.id]
  display_name      = "fbpviewer-public-subnet"
}

resource "oci_containerengine_cluster" "fbpviewer_cluster" {
  compartment_id     = var.TENANCY_OCID
  kubernetes_version = "v1.21.5"
  name               = "fbpviewer-cluster"
  vcn_id             = module.vcn.vcn_id

  endpoint_config {
    is_public_ip_enabled = true
    subnet_id            = oci_core_subnet.vcn_public_subnet.id
  }

  options {
    add_ons {
      is_kubernetes_dashboard_enabled = false
      is_tiller_enabled               = false
    }
    kubernetes_network_config {
      pods_cidr     = "10.244.0.0/16"
      services_cidr = "10.96.0.0/16"
    }
    service_lb_subnet_ids = [oci_core_subnet.vcn_public_subnet.id]
  }

  lifecycle {
    ignore_changes = all
  }
}


resource "oci_containerengine_node_pool" "fbpviewer_node_pool" {
  cluster_id         = oci_containerengine_cluster.fbpviewer_cluster.id
  compartment_id     = var.TENANCY_OCID
  kubernetes_version = "v1.21.5"
  name               = "fbpviewer-node-pool"

  node_config_details {
    placement_configs {
      availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
      subnet_id           = oci_core_subnet.vcn_private_subnet.id
    }
    size = 1
  }
  node_shape = "VM.Standard.E2.1"
#  node_shape = "VM.Standard.A1.Flex"
#
#  node_shape_config {
#    memory_in_gbs = 6
#    ocpus         = 1
#  }

  node_source_details {
    image_id    = var.IMAGE_ID
    source_type = "image"
  }

  initial_node_labels {
    key   = "name"
    value = "fbpviewer-cluster"
  }

  ssh_public_key = var.SSH_PUBLIC_KEY

  lifecycle {
    ignore_changes = all
  }
}

resource "oci_database_autonomous_database" "fbpviewer_database" {
  compartment_id              = var.TENANCY_OCID
  db_name                     = "fbpviewer"
  display_name                = "fbpviewer"
  is_free_tier                = true
  admin_password              = var.DATABASE_PASSWORD
  db_workload                 = "OLTP"
  db_version                  = "19c"
  license_model               = "LICENSE_INCLUDED"
  cpu_core_count              = 1
  data_storage_size_in_tbs    = 1
  is_mtls_connection_required = true
}

resource "oci_database_autonomous_database_wallet" "fbpviewer_wallet" {
  autonomous_database_id = oci_database_autonomous_database.fbpviewer_database.id
  password               = var.WALLET_PASSWORD
  base64_encode_content  = "true"
  generate_type          = "SINGLE"
}

resource "oci_core_public_ip" "fbpviewer_ip" {
  compartment_id = var.TENANCY_OCID
  display_name   = "fbpviewer"
  lifetime       = "RESERVED"
}

resource "oci_identity_auth_token" "fbpviewer_registry_token" {
  description = "docker registry"
  user_id     = var.USER_OCID
}