// imports
const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true, // logs helpful info to console when this is deployed
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks deployed!")
        log("--------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
