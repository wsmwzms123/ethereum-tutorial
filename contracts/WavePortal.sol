// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;
  uint256 private seed;
  event NewWave(address indexed from, uint256 timestamp, string message);

  struct Wave {
    address waver;
    string message;
    uint256 timestamp;
  }

  Wave[] waves;
  /*
     * This is an address => uint mapping, meaning I can associate an address with a number!
     * In this case, I'll be storing the address with the last time the user waved at us.
     */
  mapping(address => uint256) public lastWavedAt;

  constructor () payable {
    console.log("Yoooooooooo!, I am a contract and I am smart");
    seed = (block.timestamp + block.difficulty) % 100; 
  }

  function wave(string memory _message) public {
    require(
      lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
      "You can only wave once every 15 minutes!"
    );
    lastWavedAt[msg.sender] = block.timestamp;
    totalWaves++;
    console.log("%s has waved w/ message %s", msg.sender, _message);

    waves.push(Wave({
      waver: msg.sender,
      message: _message,
      timestamp: block.timestamp
    }));

    seed = (block.difficulty + block.timestamp + seed) % 100;
    console.log("Random # generated: %d", seed);
    
    emit NewWave(msg.sender, block.timestamp, _message);
    if (seed <= 50) {
      console.log("%s won", msg.sender);
      uint256 prizeAmount = 0.0001 ether;
      require(
        prizeAmount <= address(this).balance,
        "Trying to withdraw more money than the contract has."
      );
      (bool success, ) = msg.sender.call{value: prizeAmount}("");
      require(
        success,
        "Failed to withdraw money from contract."
      );
    }
  }

  function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

  function getTotalWaves() public view returns (uint256) {
    console.log("we have %d total waves", totalWaves);
    return totalWaves;
  }
}