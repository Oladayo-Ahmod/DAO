// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/Extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    
    uint256 constant MAX_TOKEN_PER_USER = 1000;
}