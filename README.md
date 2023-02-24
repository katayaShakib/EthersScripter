# EthersScripter
Learn by examples how to write scrpits that read from and write to Ethereum Blockchain using Ethers.js library to become a powerful Ethers Scripter
## Setup and Learning Steps
01. Clone the the repo
02. Install dependencies with `npm install`
03. Copy `.env.example` file to a new file and name it `.env`
04. Fill in the required variables/keys in `.env` file as you need them, ex: to run providers.js, you will need to fill in `INFURA_KEY` with `your Infura key`, and `EXAMPLE_ACCOUNT` with an Ethereum name `name.eth` as "vitalik.eth"
05. Learn about providers from `providers.js`, and after reading the file, try it by running `node providers.js` in your terminal
06. Learn about wallets and how to load your account with Goerli testnet ETH using a Goerli faucet from `wallets.js`, then to try it run `node wallets.js`
07. After learning about providers and wallets, you can have them both in `utils.js`
08. Try to send ETH by running `node sendETH.js` that imports `utils.js` exported functions
09. Learn how to read from a contract deployed on Ethereum blockchain from `contract_read.js`, and you can guess how to try it :)
10. Take a look on `shakibTestNFTAbi.js`. You can find the same abi and the contract address on https://goerli.etherscan.io/address/0xAd77226cFCeAaF799c820bc84668931CCF669B4B
11. Learn how to write to a contract and mint an NFT from `contract_write.js`, and try it
12. Learn how to send a transaction with calldata in it and mint another NFT from `contract_calldata.js`, and try it
