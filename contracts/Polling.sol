// SPDX-License-Identifier:MIT
pragma solidity 0.8.17;
contract Polling{

    string private statement;                       //Proposal Statment of the Poll
    string[] private candidateList;

    mapping(string => uint8) private votesReceived;

    constructor(string memory _statement, string[] memory candidateNames){  //Constructor for Initialization of choices,Proposal statement.
        statement = _statement;

        candidateList = candidateNames;
        for(uint i = 0; i < candidateList.length; i++) {
            votesReceived[candidateList[i]] = 0;
        }
    }

    function Vote(string memory candidate)  public {     //Vote Function
        
        require(validCandidate(candidate), "not available given candidate");
        votesReceived[candidate] += 1;
    }   

    function VoteInfo() public view returns(uint[] memory){            //Real-Time Voting Information
        uint[] memory voteInf = new uint[](candidateList.length);
        for(uint x = 0; x < candidateList.length; x++){
            voteInf[x] = votesReceived[candidateList[x]];
        }
        return voteInf;
    }

    function validCandidate(string memory candidate) private view returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (keccak256(abi.encodePacked(candidateList[i])) == keccak256(abi.encodePacked(candidate))) {
                return true;
            }
        }
        return false;
    }
}
