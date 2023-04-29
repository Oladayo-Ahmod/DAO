// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/Extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    
    uint256 constant MAX_TOKEN_PER_USER = 1000; //max token / user
    uint256 constant TOTAL_SUPPLY = 1000000 *10**18; // total supply to 18 decimals

    mapping (address => bool) s_hasClaimedToken; // check if token is claimed
    address[] public s_holders;

    constructor(uint256 _keepPercentage){
        ERC20("AhmodToken","AM");
        ERC20Permit("AhmodToken");
    }

}