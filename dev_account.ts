// Copyright © Aptos Foundation
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-console */

import dotenv from "dotenv";
dotenv.config();

import { AptosClient, AptosAccount, FaucetClient, TokenClient, CoinClient, Network, Provider } from "aptos";
import { NODE_URL, FAUCET_URL, deployerKey } from "./common";

(async () => {
  // Create API and faucet clients.
  // :!:>section_1a
  const client = new AptosClient(NODE_URL);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL); // <:!:section_1a

  // Create client for working with the token module.
  // :!:>section_1b
  const tokenClient = new TokenClient(client); // <:!:section_1b

  // Create a coin client for checking account balances.
  const coinClient = new CoinClient(client);

  // Create accounts.
  // :!:>section_2
  const alice = new AptosAccount(); // <:!:section_2

  console.log("=== network ===");
  console.log(NODE_URL);

  // Print out account addresses.
  console.log("=== Addresses ===");
  console.log(`Alice: ${alice.address()} ${alice.toPrivateKeyObject().privateKeyHex}`);
  console.log("");

  // Fund accounts.
  // :!:>section_3
  await faucetClient.fundAccount(alice.address(), 100_000_000);

  console.log("=== Initial Coin Balances ===");
  console.log(`Alice: ${await coinClient.checkBalance(alice)}`);
  console.log("");
})();
