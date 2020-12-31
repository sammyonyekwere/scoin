// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Scoin {
    uint256 public totalSupply;

    constructor () public {
        totalSupply = 1000000;
    }
}