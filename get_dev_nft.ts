// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-console */

import dotenv from "dotenv";
dotenv.config();

import { AptosClient, AptosAccount, FaucetClient, TokenClient, CoinClient, Network, Provider } from "aptos";
import { NODE_URL, FAUCET_URL, deployerKey, getTokenExplorerURL, network } from "./common";
import { collectionName, tokenName, tokenPropertyVersion, supply } from "./common";

(async () => {
  // Create API and faucet clients.
  // :!:>section_1a
  const provider = new Provider(network);
  const client = new AptosClient(NODE_URL);

  // Create client for working with the token module.
  // :!:>section_1b
  const tokenClient = new TokenClient(client); // <:!:section_1b


  // Create accounts.
  // :!:>section_2
  const deployer = new AptosAccount(Uint8Array.from(Buffer.from(deployerKey, 'hex')));

  console.log("=== network ===");
  console.log(NODE_URL);

  // Print out account addresses.
  console.log("=== Addresses ===");
  console.log(`deployer: ${deployer.address()}`);
  console.log("");

  // Print the collection data.
  // :!:>section_6
  const collectionData = await tokenClient.getCollectionData(deployer.address(), collectionName);
  const collectionAddress = await provider.getCollectionAddress(deployer.address(), collectionName);

  console.log(`collection address: ${collectionAddress}`);
  console.log(`collection: ${JSON.stringify(collectionData, null, 4)}`); // <:!:section_6

  const tokensOwnedQuery = await provider.getTokenOwnedFromCollectionAddress(deployer.address(), collectionAddress)
  const tokenAddress = tokensOwnedQuery?.current_token_ownerships_v2[0]?.current_token_data?.token_data_id;

  console.log(`token address: ${getTokenExplorerURL(tokenAddress)}`);
})();
