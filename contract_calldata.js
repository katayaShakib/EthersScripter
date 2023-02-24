import { ethers } from "ethers";
import { getSigner } from "./utils.js";

// we need a signer with a provider to write to Ethereum blockchain
const goerliSigner = getSigner();

// you can see shakibTestNFT contract on https://goerli.etherscan.io/address/0xAd77226cFCeAaF799c820bc84668931CCF669B4B
// you can get the address and the abi from there for now
// after that you will need to have the contract abi exported in a different file as in "shakibTestNFTAbi.js" and import it here
const shakibTestNFTAddress = "0xAd77226cFCeAaF799c820bc84668931CCF669B4B";

// here we will need the mint price and the function signature instead of the contract abi, as we will
// send a transaction with call data
const mintPrice = ethers.utils.parseEther("0.01");

/** 
 * this is the fuction signature
 * you can see it on https://goerli.etherscan.io/tx/0xe7e82710be95b5e7a85d6bb310fc61e6bef21dd3d0e897141b4868fe94568d8d
 * scroll down, click on show more details, and you will see it in input data field
 * */ 
const mintCalldata = "0x1249c58b"; 

console.log("minting an NFT!");
const mintTx = await goerliSigner.sendTransaction({
  to: shakibTestNFTAddress,
  value: mintPrice,
  data: mintCalldata,
});
// we could also specify the nonce or the gasPrice
// ex: nonce: 4,
// ex: gasPrice: 1000, //will not work, but 10000000000 which equals 10 Gwei would definitely work

console.log("tx sent!", mintTx.hash);

await mintTx.wait();

console.log("tx mined!");