// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    Proposal[] public proposals;

    function createProposal(string memory proposalName) public {
        proposals.push(Proposal({
            name: proposalName,
            voteCount: 0
        }));
    }

    function vote(uint proposalIndex) public {
        require(!voters[msg.sender], "Already voted.");
        voters[msg.sender] = true;
        proposals[proposalIndex].voteCount++;
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }
}
