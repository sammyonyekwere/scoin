// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Scoin {
    string public name;
    string public symbol;
    uint256 public totalSupply;

    // return the balance  of an address:
    mapping(address=>uint256) public balanceOf;

    constructor (uint256 _initialSupply) public {
        name = "Scoin Token";
        symbol = "SCT";
        totalSupply = _initialSupply;

        // Allocate the initial supply
        balanceOf[msg.sender] = _initialSupply;
    }
}