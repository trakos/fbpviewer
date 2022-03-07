variable "TENANCY_OCID" {
  type        = string
  description = "ID of existing oracle cloud tenancy"
}
variable "REGION" {
  type        = string
  description = "Oracle cloud region name, e. g. eu-frankfurt-1"
}
variable "SSH_PUBLIC_KEY" {
  type        = string
  description = "Any SSH public key to use for connecting to the worker nodes"
}
variable "USER_OCID" {
  type        = string
  description = "ID of oracle cloud user"
}
variable "DATABASE_PASSWORD" {
  type = string
  description = "New oracle DB password"
}
variable "WALLET_PASSWORD" {
  type        = string
  description = "New oracle DB wallet password"
}
variable "IMAGE_ID" {
  type = string
  description = "ID of image for cluster pool. Can be obtained by make get-image-id."
}