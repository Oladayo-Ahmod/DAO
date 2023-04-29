// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/Extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    
    uint256 constant MAX_TOKEN_PER_USER = 1000; //max token / user
    uint256 constant TOTAL_SUPPLY = 1000000 *10**18; // total supply to 18 decimals

    mapping (address => bool) s_hasClaimedToken; // check if token is claimed
    address[] public s_holders;

    // percentage of token to be retained by the contract
    constructor(uint256 _keepPercentage )
        ERC20("AhmodToken","AM")
        ERC20Permit("AhmodToken")
        { 
       
        uint256 keepAmount = (TOTAL_SUPPLY * _keepPercentage) / 100 ; // keep amount
        _mint(msg.sender,TOTAL_SUPPLY);
        _transfer(msg.sender,address(this),TOTAL_SUPPLY - keepAmount);
        s_holders.push(address);

    }

    function claimToken() external { // claim token for free
        require(!s_hasClaimedToken[msg.sender], "Token already claimed");
        s_hasClaimedToken[msg.sender] = true;
        _transfer(address(this),msg.sender,MAX_TOKEN_PER_USER *10 **18);
        s_holders.push(msg.sender);
    }

    
    

}