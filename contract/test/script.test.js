const {assert,expect} = require('chai')
const {ethers,network} = require('hardhat')

describe("DAO", ()=>{
    let GOVERNORTOKEN,DAOGOVERNOR,TIMELOCK,BOX

    describe("governance token", ()=>{

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

    describe("Box", ()=>{

        beforeEach(async()=>{
            let provider = await ethers.getContractFactory("Box")
            BOX = await provider.deploy()
        })

        it("only owner stores", async()=>{
            const owner = await BOX.deployed()
            const store = await BOX.store(10)
            const retrieve = await BOX.retrieve()
            assert.equal(retrieve.toString(),'10')

        })
    })

    describe("DAO Timelock", ()=>{

        beforeEach(async()=>{
            const Timelock = await ethers.getContractFactory("Timelock");
            const admin = await ethers.getSigner(0);
            const proposers = [admin.address];
            const executors = [admin.address];
            const minDelay = 60 * 60 * 24; // 24 hours
            TIMELOCK = await Timelock.deploy(minDelay, proposers, executors, admin.address);
        })

        it("deploys dao governor", async ()=>{
            const address = await TIMELOCK.deployed()
            assert.notEqual(address,0x0)
            assert.notEqual(address,undefined)
            assert.notEqual(address,null)
            assert.notEqual(address,'')
        })

        // it("", async ()=>{

        // })
    })


    
})
