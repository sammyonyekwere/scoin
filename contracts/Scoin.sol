// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Scoin {
    string public name;
    string public symbol;
    string public standard;
    uint256 public totalSupply;

    // Transfer event
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    // return the balance  of an address:
    mapping(address=>uint256) public balanceOf;

    constructor (uint256 _initialSupply) public {
        name = "Scoin Token";
        symbol = "SCT";
        standard = "Scoin Token v1.0";
        totalSupply = _initialSupply;

        // Allocate the initial supply
        balanceOf[msg.sender] = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);

        // Transfer the balance
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    } 
}