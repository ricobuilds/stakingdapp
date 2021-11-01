// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;
import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    function depositTokens(uint256 _amount) public {
        require(_amount > 0, "amount cannot be 0");

        // transferring fUSDT to this contract for staking
        tether.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;

        //checking if user has staked
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance can't be 0!");

        tether.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;

        isStaking[msg.sender] = false;
    }

    function issueTokens() public {
        require(owner == msg.sender, "you are not the owner!!!");

        /* description
        LINE 1: declaring starting point, how long it should iterate, what to do when iterating
        LINE 2: grabbing the address of each staker and storing it as receiver
        LINE 3: grabbing the stakingBalance of the receiver
        LINE 4: transfering the value to the receiver*/
        for (uint256 _idx = 0; _idx < stakers.length; _idx++) {
            address receiver = stakers[_idx];
            uint256 balance = stakingBalance[receiver];
            if (balance > 0) {
                rwd.transfer(receiver, balance);
            }
        }
    }
}
