// const { expect } = require("chai");

// describe("GovernanceToken", function () {
//   let governanceToken;

//   beforeEach(async function () {
//     const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
//     governanceToken = await GovernanceToken.deploy(10);
//     await governanceToken.deployed();
//   });

//   it("should have a total supply of 1 million tokens", async function () {
//     const totalSupply = await governanceToken.totalSupply();
//     expect(totalSupply).to.equal(1000000);
//   });

//   it("should allow users to claim up to 1000 tokens", async function () {
//     const user1 = await ethers.getSigner(1);
//     const user2 = await ethers.getSigner(2);
//     await governanceToken.connect(user1).claimToken();
//     await governanceToken.connect(user2).claimToken();
//     const balance1 = await governanceToken.balanceOf(user1.address);
//     const balance2 = await governanceToken.balanceOf(user2.address);
//     expect(balance1).to.equal(1000);
//     expect(balance2).to.equal(1000);
//   });
// });


// // dao governor

// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("DAOGovernor", function () {
//   let daoGovernor;
//   let owner;
//   let voter1;
//   let voter2;
//   let votingToken;

//   beforeEach(async function () {
//     // Deploy the voting token contract
//     const VotingToken = await ethers.getContractFactory("VotingToken");
//     votingToken = await VotingToken.deploy("Voting Token", "VOTE");

//     // Mint some tokens for the owner and voters
//     [owner, voter1, voter2] = await ethers.getSigners();
//     await votingToken.mint(owner.address, 1000);
//     await votingToken.mint(voter1.address, 1000);
//     await votingToken.mint(voter2.address, 1000);

//     // Deploy the DAO Governor contract
//     const DAOGovernor = await ethers.getContractFactory("DAOGovernor");
//     daoGovernor = await DAOGovernor.deploy(
//       votingToken.address,
//       ethers.constants.AddressZero,
//       0,
//       86400, // 1 day voting period
//       10 // 10% quorum
//     );
//     await daoGovernor.deployed();
//   });

//   it("should allow proposing and voting on a proposal", async function () {
//     // Propose a new proposal
//     const targets = [owner.address];
//     const values = [0];
//     const calldatas = [ethers.utils.defaultAbiCoder.encode(["uint256"], [42])];
//     await daoGovernor.propose(targets, values, calldatas, "Test proposal");

//     // Vote on the proposal
//     await daoGovernor.connect(voter1).castVote(1, true);
//     await daoGovernor.connect(voter2).castVote(1, true);

//     // Wait for the voting period to end
//     await ethers.provider.send("evm_increaseTime", [86400]);
//     await ethers.provider.send("evm_mine", []);

//     // Execute the proposal
//     await daoGovernor.execute(1);

//     // Verify that the proposal was executed
//     expect(await owner.callStatic.getAnswer()).to.equal(42);
//   });

//   it("should not allow non-owners to propose a proposal", async function () {
//     // Propose a new proposal from a non-owner account
//     const [nonOwner] = await ethers.getSigners();
//     const targets = [owner.address];
//     const values = [0];
//     const calldatas = [ethers.utils.defaultAbiCoder.encode(["uint256"], [42])];
//     await expect(
//       daoGovernor.connect(nonOwner).propose(
//         targets,
//         values,
//         calldatas,
//         "Test proposal"
//       )
//     ).to.be.revertedWith("Ownable: caller is not the owner");
//   });
// });



// // some timelock

// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Timelock", function () {
//   let timelock;

//   beforeEach(async function () {
//     const Timelock = await ethers.getContractFactory("Timelock");
//     const admin = await ethers.getSigner(0);
//     const proposers = [admin.address];
//     const executors = [admin.address];
//     const minDelay = 60 * 60 * 24; // 24 hours
//     timelock = await Timelock.deploy(minDelay, proposers, executors, admin.address);
//     await timelock.deployed();
//   });

//   it("should have the correct admin", async function () {
//     const admin = await ethers.getSigner(0);
//     expect(await timelock.admin()).to.equal(admin.address);
//   });

//   it("should have the correct minimum delay", async function () {
//     expect(await timelock.minDelay()).to.equal(60 * 60 * 24);
//   });

// //   it("should allow the admin to queue a transaction", async function () {
// //     const target = ethers.constants.AddressZero;
// //     const value = 0;
// //     const signature = "getBalanceOf(address)";
// //     const data = ethers.utils.defaultAbiCoder.encode(["address"], [ethers.constants.AddressZero]);
// //     const eta = Math.floor(Date.now() / 1000) + (60 * 60 * 24); // 24 hours from now
// //     await timelock.connect(await ethers.getSigner(0)).queueTransaction(target, value, signature, data, eta);
// //     const queuedTx = await timelock.transactions(0);
// //     expect(queuedTx.target).to.equal(target);
// //     expect(queuedTx.value).to.equal(value);
// //     expect(queuedTx.signature).to.equal(signature);
// //     expect(queuedTx.data).to.equal(data);
// //     expect(queuedTx.eta).to.equal(eta);
// //   });

// //   it("should allow the admin to cancel a queued transaction", async function () {
// //     const target = ethers.constants.AddressZero;
// //     const value = 0;
// //     const signature = "getBalanceOf(address)";
// //     const data = ethers.utils.defaultAbiCoder.encode(["address"], [ethers.constants.AddressZero]);
// //     const eta = Math.floor(Date.now() / 1000) + (60 * 60 * 24); // 24 hours from now
// //     await timelock.connect(await ethers.get
