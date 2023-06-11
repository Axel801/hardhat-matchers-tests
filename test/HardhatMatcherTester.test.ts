import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs'
import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic'
import { ethers } from 'hardhat'
import { type HardhatMatcherTester } from '../typechain-types/index.js'

describe('HardhatMatcherTester Tests', () => {
    let hardhatMatcherTester: HardhatMatcherTester

    async function deployFixture(): Promise<void> {
        hardhatMatcherTester = await ethers
            .getContractFactory('HardhatMatcherTester')
            .then(async (contract) => await contract.deploy())
    }

    beforeEach(async () => {
        await loadFixture(deployFixture)
    })

    it('Check if callEvent throw a BasicEvent', async () => {
        await expect(hardhatMatcherTester.callEvent()).to.emit(
            hardhatMatcherTester,
            'BasicEvent'
        )
    })

    it('Check if callEventWithArg emit a EventWithArg event and check the arg', async () => {
        await expect(hardhatMatcherTester.callEventWithArg())
            .to.emit(hardhatMatcherTester, 'EventWithArg')
            .withArgs(await hardhatMatcherTester.getAddress())
    })

    it('Check if callEventWithArgUnknowedValue throw a EventWithArgUnknowedValue', async () => {
        await expect(hardhatMatcherTester.callEventWithArgUnknowedValue())
            .to.emit(hardhatMatcherTester, 'EventWithArgUnknowedValue')
            .withArgs(anyValue)
    })

    it('Check if revert when call reverted function', async () => {
        await expect(hardhatMatcherTester.reverted()).to.be.reverted
    })

    it('check if the function has not been rejected', async () => {
        await expect(hardhatMatcherTester.callEvent()).not.to.be.reverted
    })

    it('Check if revert when call revertedWithMessage function', async () => {
        await expect(
            hardhatMatcherTester.revertedWithMessage()
        ).to.be.revertedWith('ERROR_MESSAGE')
    })

    it('Check panicCode error', async () => {
        await expect(hardhatMatcherTester.panicCode()).to.be.revertedWithPanic(
            PANIC_CODES.ASSERTION_ERROR
        )
    })

    it('Check if throw BasicError when call basicError', async () => {
        await expect(
            hardhatMatcherTester.basicError()
        ).to.be.revertedWithCustomError(hardhatMatcherTester, 'BasicError')
    })

    it('Check if throw BasicError when call basicError', async () => {
        await expect(
            hardhatMatcherTester.basicError()
        ).to.be.revertedWithCustomError(hardhatMatcherTester, 'BasicError')
    })

    it('Check if throw ErrorWithArg when call errorWithArg', async () => {
        await expect(hardhatMatcherTester.errorWithArg())
            .to.be.revertedWithCustomError(hardhatMatcherTester, 'ErrorWithArg')
            .withArgs(await hardhatMatcherTester.getAddress())
    })

    it('Check if proper address', async () => {
        expect(await hardhatMatcherTester.getAddress()).to.be.a.properAddress
    })

    it('check if proper private key', async () => {
        const wallet = ethers.Wallet.createRandom()
        expect(wallet.privateKey).to.be.a.properPrivateKey
    })
})
