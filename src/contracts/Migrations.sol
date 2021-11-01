// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

contract Migrations {
    address public owner;
    uint256 public last_completed_migration;

    // setting up initial state for the vars
    constructor() {
        owner = msg.sender;
    }

    modifier ownerRestrict() {
        if (msg.sender == owner) _;
    }

    function setCompleted(uint256 completed) public ownerRestrict {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public ownerRestrict {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
