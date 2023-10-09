// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0
import {  Network } from "aptos";

//:!:>section_1
export const NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com";
export const FAUCET_URL = process.env.APTOS_FAUCET_URL || "https://faucet.devnet.aptoslabs.com";
export const EXPLORER_URL = process.env.APTOS_EXPLORER_URL || "https://explorer.aptoslabs.com/token/";
//<:!:section_1

export const aptosCoinStore = "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>";
export const fungibleStore = "0x1::fungible_asset::FungibleStore";

export const deployerKey = process.env.APTOS_DEPLOYER_KEY;
export const network =  process.env.APTOS_NETWORK as Network || Network.DEVNET;

export const collectionName = process.env.APTOS_COLLECTION_NAME;
export const collectionDesc = process.env.APTOS_COLLECTION_DESC;
export const collectionURI = process.env.APTOS_COLLECTION_URI;

export const tokenName = process.env.APTOS_TOKEN_NAME;
export const tokenDesc = process.env.APTOS_TOKEN_DESC;
export const tokenURI = process.env.APTOS_TOKNE_URI;

export const tokenPropertyVersion = 0;
export const supply = 100;

export function getTokenExplorerURL(tokenAddress: string) {
    return `${EXPLORER_URL}${tokenAddress}/tokens/overview?network=${network}`
}