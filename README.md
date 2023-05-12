# My First Web3 Hardhat Project

## Description

:file_folder: This is the repository to which I'll be pushing all of my lesson code as I follow <a href="https://www.youtube.com/watch?v=gyMwXuJrbJQ">Patrick Collins's Full Stack Web3 totorial</a>!

:clock1: As of the most recent commit, I am currently [12:37:13](https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=45433) into this __*massive*__ 32 hour course!

:moneybag: For those interested, note that at the time of the most recent commit, the recommended testnet to use is <a href="https://sepoliafaucet.com/">Sepolia</a> rather than Goerli.

## Project Structure


## Useful Links

- <a href="https://www.youtube.com/watch?v=gyMwXuJrbJQ">Patrick's FreeCodeCamp video</a>
- <a href="https://github.com/smartcontractkit/full-blockchain-solidity-course-js">Patrick's Github Repository</a>
- <a href="https://metamask.io/">Metamask</a>
- <a href="https://sepoliafaucet.com/">Sepolia ETH Faucet</a>.
- <a href="https://sepolia.etherscan.io/">Sepolia Etherscan</a>
- <a href="https://docs.ethers.org/v5/">Ethers Documentation</a>
- <a href="https://hardhat.org/">Hardhat Website</a>

## Using This Repo

Download, then run

```shell
npx i
```

to install packages! :briefcase:

You'll need:
- __A Sepolia RPC URL__
    - You can get this via <a href="https://www.alchemy.com/">Alchemy</a>
- __A Seopolia private key__
    - You can get by connecting your Metamask to Sepolia and exporting your private key
- __An Etherscan API Key__
    - You can get this by signing up at <a href="https://etherscan.io/">Etherscan</a>.

You'll need to create environment variables for:

```plaintext
# SEPOLIA
SEPOLIA_RPC_URL=
SEPOLIA_PRIVATE_KEY=

# ETHERSCAN
ETHERSCAN_API_KEY=

# LOCAL NODE (update this whenever you run a new local node)
LOCAL_NODE_RPC_URL=
LOCAL_NODE_PRIVATE_KEY=

# COIN MARKET CAP
COINMARKETCAP_API_KEY=
```