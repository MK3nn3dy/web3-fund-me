require("@nomicfoundation/hardhat-toolbox")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("dotenv").config()
require("hardhat-deploy")

// SEPOLIA NETWORK
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-rinkeby"
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
// LOCAL NODE
const LOCAL_NODE_RPC_URL = process.env.LOCAL_NODE_RPC_URL
const LOCAL_NODE_PRIVATE_KEY = process.env.LOCAL_NODE_PRIVATE_KEY
// COIN MARKET CAP
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [SEPOLIA_PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
        local: {
            url: LOCAL_NODE_RPC_URL,
            accounts: [LOCAL_NODE_PRIVATE_KEY],
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
}
