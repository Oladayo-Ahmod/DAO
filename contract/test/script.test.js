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
        await GOVERNORTOKEN.connect.claimToken(user)
        assert.equal(GOVERNORTOKEN.balanceOf(user.address),1000)
    })
})
