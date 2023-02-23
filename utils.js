/**
 * dotenv package for handling environment variables
 * you can do this if you do not want to add "type": "module" to your package.json file
 * const { dotenv } = require('dotenv').config();
 * const { ethers } = require('ethers');
 */

import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";

const getProvider = (mainnet = false) => {
  const providerUrl = mainnet
    ? `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
    : `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`;

  return new ethers.providers.JsonRpcProvider(providerUrl);
};
// const provider = getProvider();
// console.log("provider", await provider.getNetwork());

// if you prefer to use Alchemy API
/* const getProviderViaAlchemy = (mainnet = false) => {
    const providerUrl = mainnet
      ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_KEY}`
      : `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_GOERLI_KEY}`;
  
    return new ethers.providers.JsonRpcProvider(providerUrl);
  }; */

const generateNewWallet = () => ethers.Wallet.createRandom();
// generateNewWallet();

const getSigner = (mainnet = false) => {
  const provider = getProvider(mainnet);

  return new ethers.Wallet(process.env.My_WALLET_PRIVATE_KEY, provider);
};
// const signer = getSigner();
// console.log("signer: ", await signer.getAddress());

export { getProvider, generateNewWallet, getSigner };