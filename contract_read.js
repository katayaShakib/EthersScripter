import { ethers } from "ethers";
import { getProvider } from "./utils.js";
import shakibTestNFTAbi from "./shakibTestNFTAbi.js"; // no curly braces because it's export default

// as we saw before to read from Ethereum blockchain we just needed a provider
const goerliProvider = getProvider();

// you can see shakibTestNFT contract on https://goerli.etherscan.io/address/0xAd77226cFCeAaF799c820bc84668931CCF669B4B
// you can get the address and the abi from there for now
// after that you will need to have the contract abi exported in a different file as in "shakibTestNFTAbi.js" and import it here
const shakibTestNFTAddress = "0xAd77226cFCeAaF799c820bc84668931CCF669B4B";

// create a new contract instance of shakibTestNFT contract
const shakibTestNFTContract = new ethers.Contract(
  shakibTestNFTAddress,
  shakibTestNFTAbi,
  goerliProvider
);

const mintPrice = await shakibTestNFTContract.MINT_PRICE();

console.log("shakibTestNFT's mint price ", mintPrice); // will return a BigNumber
console.log("shakibTestNFT's mint price ", ethers.utils.formatEther(mintPrice));