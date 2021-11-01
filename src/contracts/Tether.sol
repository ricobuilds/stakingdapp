// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

contract Tether {
    string public name = "Tether";
    string public symbol = "USDT";
    uint256 public supply = 1000000000000000000000000;
    uint256 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 indexed _uint
    );
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 indexed _uint
    );

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;

    constructor() {
        balances[msg.sender] = supply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balances[_from]);
        require(_value <= allowances[_from][msg.sender]);
        balances[_from] -= _value; //sub the value from sender
        balances[_to] += _value; //add the value to receiver
        allowances[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
