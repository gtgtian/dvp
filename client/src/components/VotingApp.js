import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Voting from '../Voting.json'

const VotingApp = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const contractInstance = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setContract(contractInstance);

      const proposalsData = await contractInstance.methods.getProposals().call();
      setProposals(proposalsData);
    };
    loadBlockchainData();
  }, []);

  const createProposal = async (name) => {
    await contract.methods.createProposal(name).send({ from: account });
    const proposalsData = await contract.methods.getProposals().call();
    setProposals(proposalsData);
  };

  const vote = async (index) => {
    await contract.methods.vote(index).send({ from: account });
    const proposalsData = await contract.methods.getProposals().call();
    setProposals(proposalsData);
  };

  return (
    <div>
      <h1>Decentralized Voting Platform</h1>
      <p>Account: {account}</p>
      <h2>Proposals</h2>
      {proposals.map((proposal, index) => (
        <div key={index}>
          <p>{proposal.name} - Votes: {proposal.voteCount}</p>
          <button onClick={() => vote(index)}>Vote</button>
        </div>
      ))}
      <h2>Create Proposal</h2>
      <input type="text" id="proposalName" placeholder="Proposal Name" />
      <button onClick={() => createProposal(document.getElementById('proposalName').value)}>
        Create Proposal
      </button>
    </div>
  );
};

export default VotingApp;
