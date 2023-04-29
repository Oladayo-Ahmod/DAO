// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {

    event newValueDetected(uint256 newValue);

    uint256 private value;

    function store (uint256 newValue) public onlyOwner {
        value = newValue;

        emit newValueDetected(newValue);
    }

    function retrieve() public view returns(uint256){
        return value;
    }
}