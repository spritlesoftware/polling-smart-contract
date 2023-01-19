const {expect} =  require("chai");
const { ethers } = require("hardhat");
const testCase = require('mocha').describe;

testCase("Deployment",function(){
    let Poll;
    let poll;
    let proposal="Should we have coffee shop in our office?";
    let candidateNames;
    let v1;
    let v2;
    let v3;
    beforeEach(async function(){
        Poll = await ethers.getContractFactory("Polling");
        [v1,v2,v3] = await ethers.getSigners();
        candidateNames = ["Yes","No","Shouldbe","Never"];
        poll = await Poll.deploy(proposal,candidateNames);
    });

    testCase("Polling Contract",function(){

        // it("Official Check",async function(){
        //     console.log("Official Address : ",Official.address);
        //     const officialInfo = await poll.OfficialAddress();
        //     console.log("Code Official Address : ",officialInfo);
        //     expect(await Official.address).to.equal(officialInfo);
        // });

        it("Proposal Check",async function(){
            console.log("Proposal Statement : ",proposal);
            const st = await poll.getStatement();
            console.log("Code Statement : ",st);
            expect(await st).to.equal(proposal);
        });

        it("CandidateList Check",async function(){
            console.log("Candidate List: ",candidateNames);
            const ch = await poll.getCandidates();
            console.log("Code Choices Array : ",ch);
            expect(await ch[0]).to.equal(candidateNames[0]);  
        });

        // it("States Check - Polling Started",async function(){
        //     const stat = await poll.getState();
        //     console.log("State of the Poll : ",stat);
        //     expect(await stat).to.equal(0);
        // });

        // it("Check converted state - Voting Started",async function(){
        //     await poll.startVote();
        //     const stat = await poll.getState();
        //     console.log("State of the Poll : ",stat);
        //     expect(await stat).to.equal(1);
        // });

        it("Voting check",async function(){
            
            await poll.connect(v1).Vote("Yes");
            await poll.connect(v2).Vote("No");
            await poll.connect(v3).Vote("Yes");
            const info = await poll.VoteInfo();
            console.log("Vote Info : ",info);
            
        });

    });
});