import { ethers } from "ethers";
import { getSigner } from "./utils.js";
import shakibTestNFTAbi from "./shakibTestNFTAbi.js"; // no curly braces because it is export default

// we need a signer with a provider to write to Ethereum blockchain
const goerliSigner = getSigner();

// you can see shakibTestNFT contract on https://goerli.etherscan.io/address/0xAd77226cFCeAaF799c820bc84668931CCF669B4B
// you can get the address and the abi from there for now
// after that you will need to have the contract abi exported in a different file as in "shakibTestNFTAbi.js" and import it here
const shakibTestNFTAddress = "0xAd77226cFCeAaF799c820bc84668931CCF669B4B";

// create a new contract instance of shakibTestNFT contract
const shakibTestNFTContract = new ethers.Contract(
  shakibTestNFTAddress,
  shakibTestNFTAbi,
  goerliSigner
);

const mintPrice = await shakibTestNFTContract.MINT_PRICE();

console.log("shakibTestNFT's mint price ", mintPrice); // will return a BigNumber
console.log("shakibTestNFT's mint price ", ethers.utils.formatEther(mintPrice));

// mint an NFT
console.log("minting an NFT!");
const mintTx = await shakibTestNFTContract.mint({
  value: mintPrice, // instead of mintPrice if we want to add a number manually, we can do ethers.utils.parseEther("0.01")
});

console.log("tx is sent!", mintTx.hash);

await mintTx.wait();

console.log("tx is mined!");