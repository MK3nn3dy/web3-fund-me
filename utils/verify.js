const { run } = require("hardhat")

const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log("Our custom verification function ran.")
    } catch (e) {
        if (e.message.toLowerCase().includes("already been verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
            e.message && console.log("The error message is:", e.message)
        }
    }
}

module.exports = { verify }
