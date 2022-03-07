# Get first image id that can be used as an image in a cluster.
get-image-id:
	A=`oci compute image list --operating-system="Oracle Linux"  --shape="VM.Standard.E2.1" | jq '.data | map(.id)'`; \
	B=`oci ce node-pool-options get --node-pool-option-id all | jq '.data.sources | map(."image-id")'`; \
	jq -rn "$$A - ($$A - $$B) | .[0] "

# Read autonomous_database_wallet.zip that is outputted by terraform and convert it to ORACLE_CWALLET_SSO format.
get-wallet-env:
	unzip -p autonomous_database_wallet.zip cwallet.sso | base64 -w0