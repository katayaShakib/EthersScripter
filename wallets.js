/**
 * dotenv package for handling environment variables
 * you can do this if you do not want to add "type": "module" to your package.json file
 * const { dotenv } = require('dotenv').config();
 * const { ethers } = require('ethers');
 */

import * as dotenv from "dotenv";
dotenv.config();
import { BigNumber, ethers } from "ethers";

// create a random wallet
const randomWallet = ethers.Wallet.createRandom();

// test the random wallet
console.log("12 word phrase ", randomWallet.mnemonic.phrase);
console.log("private key ", randomWallet.privateKey);
console.log("address ", randomWallet.address);

// create 10 accounts from the same mnumonic simillar to creating new accounts in the Metamask wallet
let path, myWallet;

for (let i = 0; i < 10; i++) {
  // you can get the path if you console.log(randomWallet.mnemonic), and then add "/${i}" to have different private keys and addresses;
  path = `m/44'/60'/0'/0/${i}` 
  myWallet = ethers.Wallet.fromMnemonic(randomWallet.mnemonic.phrase, path);
  console.log(i, "private key ", myWallet.privateKey);
  console.log(i, "address ", myWallet.address);
}

// create a wallet from one of the private keys we got, and test that it does derive the address that you are expecting it to derive
const wallet = new ethers.Wallet(process.env.My_WALLET_PRIVATE_KEY);
console.log("my wallet address (from a private key) ", wallet.address);

// test that every wallet is a signer
// no need to connect to a provider to be able to sign a message, but keep in mind that all of that will be happining locally
console.log("is signer?", wallet._isSigner); // returns true
const signature = await wallet.signMessage("Hello!");
console.log("signed message/signature ", signature);

/**
 * recover the message
 * recovering can be happened on another server/computer
 * a lot of times you would have a timestamp or a nonce in there so no one can replay it
 */
const signerAddress = ethers.utils.verifyMessage("Hello!", signature);
console.log("signer address ", signerAddress);

// connect the wallet/signer to goerli testnet via provider to be able to broadcast a transaction
const goerliInfuraUrl = `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`;
const goerliProvider = new ethers.providers.JsonRpcProvider(goerliInfuraUrl);

// wallet and signer are two names for the same thing
// signer.connect(goerliProvider); //didn't work because maybe it creates a new signer, so we added "goerliProvider" as a second argument
const signer = new ethers.Wallet(
  process.env.My_WALLET_PRIVATE_KEY,
  goerliProvider
);

console.log(
  "myBalance on goerli testnet is ",
  ethers.utils.formatEther(await goerliProvider.getBalance(signer.address))
);
const myBalance = await goerliProvider.getBalance(signer.address);

// send ETH to another account
// we will have to have a mainnet provider if we want to resolve ENS
const mainnetInfuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const mainnetProvider = new ethers.providers.JsonRpcProvider(mainnetInfuraUrl);

const exampleAccountAddress = await mainnetProvider.resolveName(
  process.env.EXAMPLE_ACCOUNT
);

// send 0.01% of our balance to example account
// log the value first
console.log(
  `sending ${ethers.utils.formatEther(
    myBalance.div(BigNumber.from(100))
  )} to ${exampleAccountAddress}`
);

// send the transaction
const tx = await signer.sendTransaction({
  to: exampleAccountAddress,
  value: myBalance.div(BigNumber.from(100)),
});
// first, the tx goes to the mempool
console.log("tx is sent/in the mempool!", tx);

// wait the tx to be confirmed/mined
await tx.wait();

// here it is confirmed/mined
console.log("tx is confirmed/mined!");