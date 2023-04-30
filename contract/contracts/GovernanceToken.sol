// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    
     // events for the governance token
    event TokenTransfered(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    // Events
    event TokenMinted(address indexed to, uint256 amount);
    event TokenBurned(address indexed from, uint256 amount);

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
        s_holders.push(msg.sender);

    }

    function claimToken() external { // claim token for free
        require(!s_hasClaimedToken[msg.sender], "Token already claimed");
        s_hasClaimedToken[msg.sender] = true;
        _transfer(address(this),msg.sender,MAX_TOKEN_PER_USER *10 **18);
        s_holders.push(msg.sender);
    }

    function getTokenHolders() external view returns(uint256) {
        return s_holders.length;
    }
    
    // Overrides required for Solidiy
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
        emit TokenTransfered(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
        emit TokenMinted(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20Votes)
    {
        super._burn(account, amount);
        emit TokenBurned(account, amount);
    }


}