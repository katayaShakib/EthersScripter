# EthersScripter
Learn to write scrpits that read from and write to Ethereum Blockchain using Ethers.js library to become a powerful Ethers Scripter
## Setup and Learning Steps
1. Clone the the repo
2. Install dependencies with `npm install`
3. Copy `.env.example` file to a new file and name it `.env`
4. Fill in the required variables/keys in `.env` file as you need them, ex: to run providers.js, you will need to fill in `INFURA_KEY` with `your Infura key`, and `EXAMPLE_ACCOUNT` with an Ethereum name `name.eth` as "vitalik.eth"
5. Learn about providers from `providers.js`, after reading the file to try it, run `node providers.js` 
6. Learn about wallets from Run `wallets.js`, after reading the file to try it, run `node wallets.js`
7. After learning about providers and wallets, you can have them both in `utils.js`
8. Try to send ETH bu running `node sendETH.js` that imports `utils.js` exported functions
