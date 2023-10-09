// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-console */

import dotenv from "dotenv";
dotenv.config();

import { AptosClient, AptosAccount, FaucetClient, TokenClient, CoinClient, Network, Provider } from "aptos";
import { NODE_URL, FAUCET_URL, deployerKey, getTokenExplorerURL, network } from "./common";
import { collectionName, collectionDesc, collectionURI, tokenName, tokenDesc, tokenURI, tokenPropertyVersion, supply } from "./common";

(async () => {
  // Create API and faucet clients.
  // :!:>section_1a
  const provider = new Provider(network);
  const client = new AptosClient(NODE_URL);

  // Create client for working with the token module.
  // :!:>section_1b
  const tokenClient = new TokenClient(client); // <:!:section_1b

  // Create a coin client for checking account balances.
  const coinClient = new CoinClient(client);

  // Create accounts.
  // :!:>section_2
  const deployer = new AptosAccount(Uint8Array.from(Buffer.from(deployerKey, 'hex')));

  console.log("=== network ===");
  console.log(NODE_URL);

  // Print out account addresses.
  console.log("=== Addresses ===");
  console.log(`deployer: ${deployer.address()}`);
  console.log("");

  console.log("=== Initial Coin Balances ===");
  console.log(`deployer: ${await coinClient.checkBalance(deployer)}`);
  console.log("");

  console.log("=== Creating Collection and Token ===");

  // Create the collection.
  // :!:>section_4
  const txnHash1 = await tokenClient.createCollection(
    deployer,
    collectionName,
    collectionDesc,
    collectionURI,
  ); // <:!:section_4
  const tx1 = await client.waitForTransactionWithResult(txnHash1, { checkSuccess: true });
  console.log(`createCollection: ${tx1.hash}`)

  // Create a token in that collection.
  // :!:>section_5
  const txnHash2 = await tokenClient.createToken(
    deployer,
    collectionName,
    tokenName,
    tokenDesc,
    supply,
    tokenURI,
  ); // <:!:section_5
  const tx2 = await client.waitForTransactionWithResult(txnHash2, { checkSuccess: true });
  console.log(`createToken: ${tx2.hash}`)

  // Print the collection data.
  // :!:>section_6
  const collectionData = await tokenClient.getCollectionData(deployer.address(), collectionName);
  const collectionAddress = await provider.getCollectionAddress(deployer.address(), collectionName);

  console.log(`collection address: ${collectionAddress}`);
  console.log(`collection: ${JSON.stringify(collectionData, null, 4)}`); // <:!:section_6

  // Get the token balance.
  // :!:>section_7
  const aliceBalance1 = await tokenClient.getToken(
    deployer.address(),
    collectionName,
    tokenName,
    `${tokenPropertyVersion}`,
  );

  console.log(`deployer's token balance: ${aliceBalance1["amount"]}`); // <:!:section_7

  // Get the token data.
  // :!:>section_8
  const tokenData = await tokenClient.getTokenData(deployer.address(), collectionName, tokenName);
  console.log(`deployer's token data: ${JSON.stringify(tokenData, null, 4)}`); // <:!:section_8

  const tokensOwnedQuery = await provider.getTokenOwnedFromCollectionAddress(deployer.address(), collectionAddress)
  const tokenAddress = tokensOwnedQuery?.current_token_ownerships_v2[0]?.current_token_data?.token_data_id;
  console.log(`token address: ${getTokenExplorerURL(tokenAddress)}`);
})();
