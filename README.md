## APTOS-NFT

- generate dev account

```
npm run dev_account

> ts-test@1.0.0 dev_account
> ts-node dev_account.ts

=== network ===
https://fullnode.devnet.aptoslabs.com
=== Addresses ===
Alice: 0x75d23954d113f2f9d90c4c5cfb172b1daff548b3923219d6dc9fd31aac89c36a 0x1cb7dd9db7b0c1415823790248a7413a430218060eb06f464ddc76432a4de4da

=== Initial Coin Balances ===
Alice: 100000000
```

- config deployer

```
echo "APTOS_DEPLOYER_KEY=1cb7dd9db7b0c1415823790248a7413a430218060eb06f464ddc76432a4de4da" >> .env
```

- deploy dev nft

```
 npm run deploy_dev_nft

> ts-test@1.0.0 deploy_dev_nft
> ts-node deploy_dev_nft.ts

=== network ===
https://fullnode.devnet.aptoslabs.com
=== Addresses ===
deployer: 0x75d23954d113f2f9d90c4c5cfb172b1daff548b3923219d6dc9fd31aac89c36a

=== Initial Coin Balances ===
deployer: 200000000

=== Creating Collection and Token ===
collection: {
    "description": "Glacier is building a composable, modular and scalable L2 data network for large-scale Dapps.",
    "maximum": "18446744073709551615",
    "mutability_config": {
        "description": false,
        "maximum": false,
        "uri": false
    },
    "name": "Glacier",
    "supply": "1",
    "uri": "https://www.glacier.io/"
}
deployer's token balance: 100
deployer's token data: {
    "description": "Glacier Catalyst NFT",
    "name": "Glacier Catalyst 01",
    "maximum": "18446744073709551615",
    "supply": "100",
    "uri": "https://avatars.githubusercontent.com/u/121307080",
    "default_properties": {
        "data": {}
    },
    "mutability_config": {
        "description": false,
        "maximum": false,
        "properties": false,
        "royalty": false,
        "uri": false
    }
}

```