import { ethers } from 'hardhat'

async function main(): Promise<void> {
    const hardhatMatcherTester = await ethers
        .getContractFactory('HardhatMatcherTester')
        .then(async (contract) => await contract.deploy())

    console.log(
        `HardhatMatcherTester deployed to ${await hardhatMatcherTester.getAddress()}`
    )
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
