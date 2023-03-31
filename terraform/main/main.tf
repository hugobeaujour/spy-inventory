module "common" {
  source      = "../terraform-modules/common"
  environment = local.environment
  repo        = local.repo
  region      = local.region
  group       = local.group
}
