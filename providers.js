/**
* dotenv package for handling environment variables
* you can do this if you do not want to add "type": "module" to your package.json file
* const { dotenv } = require('dotenv').config();
* const { ethers } = require('ethers');
*/

import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";

// add a mainnet provider using Infura API for RPC
const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

// test the provider
console.log("Current Block Number", await provider.getBlockNumber());
// to resolve ENS
// you can have your own name.eth on mainnet from ENS
console.log("vitalik.eth is ", await provider.resolveName("vitalik.eth"));
console.log("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 is ", await provider.lookupAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"));
console.log("sanford is ", await provider.resolveName(process.env.EXAMPLE_ACCOUNT));

const vitalikBalance = await provider.getBalance("vitalik.eth");
let exampleAccountBalance = await provider.getBalance(process.env.EXAMPLE_ACCOUNT);

// use parseEther to convert from stringNumbers to bigNumbers "multiply by 10^18"
// use formatEther to convert from bigNumbers to stringNumbers
console.log("1 Eth is ", ethers.utils.parseEther("1").toString(), "wei");
console.log("vitalik.eth has ", ethers.utils.formatEther(vitalikBalance));
console.log("example account has ", ethers.utils.formatEther(exampleAccountBalance));
if(vitalikBalance.gt(exampleAccountBalance)) {
    console.log("vitalik has more Eth than example account");
} else {
    console.log("example account has more Eth than vitalik");
}

/**
* add 6034 to make example account have ether more than Vitalik, as Vitalik has 6033 ether on the mainnet at the time I wrote this code
* the next line of code will not work because it is converting 6034 wei to a big number and then adding it to exampleAccountBalance
* exampleAccountBalance = exampleAccountBalance.add(BigNumber.from(6034));
* but you can do it this way
 */
exampleAccountBalance = exampleAccountBalance.add(ethers.utils.parseEther("6034"));
console.log("example account has ", ethers.utils.formatEther(exampleAccountBalance));
if(vitalikBalance.gt(exampleAccountBalance)) {
    console.log("vitalik has more Eth than example account");
} else {
    console.log("example account has more Eth than vitalik");
}