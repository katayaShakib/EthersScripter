/**
 * dotenv package for handling environment variables
 * you can do this if you do not want to add "type": "module" to your package.json file
 * const { dotenv } = require('dotenv').config();
 * const { ethers } = require('ethers');
 */

import * as dotenv from "dotenv";
dotenv.config();
import { BigNumber, ethers } from "ethers";
import { getProvider, getSigner } from "./utils.js";

const mainnetProvider = getProvider(true);
const goerliSigner = getSigner();

const exampleAccountAddress = await mainnetProvider.resolveName(
  process.env.EXAMPLE_ACCOUNT
);
const myBalance = await goerliSigner.getBalance();

console.log(ethers.utils.formatEther(myBalance));

console.log(
  `sending ${ethers.utils.formatEther(
    myBalance.div(BigNumber.from(100))
  )} to ${exampleAccountAddress}`
);

const tx = await goerliSigner.sendTransaction({
  to: exampleAccountAddress,
  value: myBalance.div(BigNumber.from(100)),
});

// first, the tx goes to the mempool
console.log("tx is sent/in the mempool!", tx.hash);

// wait the tx to be confirmed/mined
await tx.wait();

// here it is confirmed/mined
console.log("tx is confirmed/mined!");