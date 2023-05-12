// imports
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai") // this is being overwritten by waffle in hardhat/hardhat-deploy
const { developmentChains } = require("../../helper-hardhat-config")

// ternary to only run this if we're on a dev chain (localhost or hardhat network)
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          let mockV3Aggregator
          const sendValue = 5847747921884
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              fundMe = await ethers.getContract("FundMe", deployer)
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
          })

          describe("constructor", async function () {
              it("sets the aggregator addresses correctly", async function () {
                  const response = await fundMe.getPriceFeed()
                  assert.equal(response, mockV3Aggregator.address)
              })
          })

          describe("fund", async function () {
              it("Fails if you don't send enough ETH", async function () {
                  await expect(fundMe.fund()).to.be.revertedWith(
                      "You need to spend more ETH!"
                  )
              })
              it("Updates the amountFunded data sctructure", async function () {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.getAddressToAmountFunded(
                      deployer
                  )
                  assert.equal(response.toString(), sendValue.toString())
              })
              it("Should add funder to funder array", async function () {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.getFunder(0)
                  assert.equal(response.toString(), deployer.toString())
              })
          })

          describe("withdraw", async function () {
              // add funds before any tests in withdraw
              beforeEach(async function () {
                  await fundMe.fund({ value: sendValue })
              })
              it("withdraw ETH from a single founder", async function () {
                  // ARRANGE
                  // get balance of contract address after "beforeEach" funding ran
                  // but before withdraw:
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  // get balance of deployer after "beforeEach" funding ran
                  // but before withdraw:
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  // ACT
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt

                  const gasCost = gasUsed.mul(effectiveGasPrice)

                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  // ASSERT
                  // check if fund me balance is 0
                  assert.equal(endingFundMeBalance, 0)
                  // check if all of fund me balance is in deployer balance
                  assert.equal(
                      endingDeployerBalance.add(gasCost).toString(),
                      startingDeployerBalance
                          .add(startingFundMeBalance)
                          .toString()
                      // .add is a function on the "bigNumber" type returned
                  )
              })
              it("allows us to withdraw with multiple funders", async function () {
                  // ARRANGE
                  const accounts = await ethers.getSigners()
                  // start at 1 as zero is deployer
                  for (i = 1; i < 6; i++) {
                      const fundMeConnectedContract = await fundMe.connect(
                          accounts[i]
                      )
                      await fundMeConnectedContract.fund({ value: sendValue })
                  }
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  // ACT
                  const transactionResponse = await fundMe.cheaperWithdraw()

                  const transactionReceipt = await transactionResponse.wait()
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const withdrawGasCost = gasUsed.mul(effectiveGasPrice)
                  console.log(`GasCost: ${withdrawGasCost}`)
                  console.log(`GasUsed: ${gasUsed}`)
                  console.log(`GasPrice: ${effectiveGasPrice}`)
                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  // ASSERT
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(withdrawGasCost).toString()
                  )

                  await expect(fundMe.getFunder(0)).to.be.reverted

                  for (i = 1; i < 6; i++) {
                      assert.equal(
                          await fundMe.getAddressToAmountFunded(
                              accounts[i].address
                          ),
                          0
                      )
                  }
              })
              it("should only allow the owner to withdraw", async function () {
                  // get random account, not deployer (delpoyer is owner of contract at index 0)
                  // ARRANGE
                  const accounts = await ethers.getSigners()
                  const randomAccount = accounts[1]
                  // connect to contract with this non-owner:
                  const fundMeConnectedContract = await fundMe.connect(
                      randomAccount
                  )
                  await expect(
                      fundMeConnectedContract.withdraw()
                  ).to.be.revertedWithCustomError(fundMe, "FundMe__NotOwner")
              })
          })
      })
