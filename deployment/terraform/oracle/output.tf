output "fbpviewer-cluster-id" {
  value = oci_containerengine_cluster.fbpviewer_cluster.id
}

output "fbpviewer-database-connection-string-high" {
  value = oci_database_autonomous_database.fbpviewer_database.connection_strings.0.all_connection_strings.HIGH
}

resource "local_file" "autonomous_database_wallet_file" {
  content_base64  = oci_database_autonomous_database_wallet.fbpviewer_wallet.content
  filename        = "${path.module}/autonomous_database_wallet.zip"
  file_permission = "0700"
}

output "fbpviewer-public-ip" {
  value = oci_core_public_ip.fbpviewer_ip.ip_address
}

output "fbpviewer-registry-password" {
  value = oci_identity_auth_token.fbpviewer_registry_token.token
}

output "fbpviewer-container-registry-namespace" {
  value = data.oci_artifacts_container_configuration.container_registry.namespace
}