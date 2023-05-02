const {assert,expect} = require('chai')
const {ethers,network} = require('hardhat')

describe("DAO", async ()=>{
    let GOVERNORTOKEN,DAOGOVERNOR,TIMELOCK,BOX

    beforeEach(async()=>{
        let provider = await ethers.getContractFactory("GovernanceToken")
        GOVERNORTOKEN = await provider.deploy('10')
    })

    it("deploys governance token", async()=>{
        const address = await GOVERNORTOKEN.deployed()
        assert.notEqual(address,0x0)
        assert.notEqual(address,undefined)
        assert.notEqual(address,null)
        assert.notEqual(address,'')
    })
    it("claims token", async ()=>{
        const user = await ethers.getSigner(1)
        await GOVERNORTOKEN.connect(user).claimToken()
        const balance = await GOVERNORTOKEN.balanceOf(user.address)
        assert.equal(balance.toString(),ethers.utils.parseEther('1000'))
    })
    it("gets total holder", async()=>{
        await GOVERNORTOKEN.deployed()
        const [,user1,user2,user3] = await ethers.getSigners()
        await GOVERNORTOKEN.connect(user1).claimToken()
        await GOVERNORTOKEN.connect(user2).claimToken()
        await GOVERNORTOKEN.connect(user3).claimToken()
        const holders = await GOVERNORTOKEN.getTokenHolders()
        assert.equal(holders.toString(),'4')
    })
})
