import React, { useState } from 'react';
import { createOutOfBandInvitation } from './api';
import { createOutOfBandInvitation as createVerifierInvitation, sendProofRequest, fetchProofRecord, credentialDetail } from './api_verifier';
import CredentialForm from './components/CredentialForm';

const App = () => {
  const [issuerInvitation, setIssuerInvitation] = useState(null);
  const [verifierInvitation, setVerifierInvitation] = useState(null);
  const [error, setError] = useState(null);
  const [presExId, setPresExId] = useState(null);
  const [proofRecord, setProofRecord] = useState(null);
  const [recordId, setRecordId] = useState('');
  const [credentialRecordId, setCredentialRecordId] = useState('');

  const handleChangeRecordId = (event) => {
    setRecordId(event.target.value);
  };

  const handleChangeCredentialRecordId = (event) => {
    setCredentialRecordId(event.target.value);
  };

  const handleCreateIssuerInvitation = async () => {
    try {
      const invitationData = await createOutOfBandInvitation();
      setIssuerInvitation(invitationData);
      console.log('Invitation created from Issuer:', invitationData);
    } catch (error) {
      setError(error.message || 'Error creating Issuer invitation');
      console.error('Error creating Issuer invitation:', error);
    }
  };

  const handleCreateVerifierInvitation = async () => {
    try {
      const invitationData = await createVerifierInvitation();
      setVerifierInvitation(invitationData);
      console.log('Invitation created from Verifier:', invitationData);
    } catch (error) {
      setError(error.message || 'Error creating Verifier invitation');
      console.error('Error creating Verifier invitation:', error);
    }
  };

  const handleSendProofRequest = async () => {
    try {
      const connectionId = '6f4841bc-02eb-4144-819c-3b2ce2fae686';
      const response = await sendProofRequest(connectionId);
      setPresExId(response.pres_ex_id);
      console.log('Proof request sent:', response);
    } catch (error) {
      setError(error.message || 'Error sending proof request');
      console.error('Error sending proof request:', error);
    }
  };

  const handleFetchProofRecord = async () => {
    try {
      const response = await fetchProofRecord(recordId);
      setProofRecord(response);
      console.log('Proof record fetched:', response);
    } catch (error) {
      setError(error.message || 'Error fetching proof record');
      console.error('Error fetching proof record:', error);
    }
  };

  const handleFetchCredentialDetail = async () => {
    try {
      const response = await credentialDetail(credentialRecordId);
      setProofRecord(response);
      console.log('Credential detail fetched:', response);
    } catch (error) {
      setError(error.message || 'Error fetching credential detail');
      console.error('Error fetching credential detail:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Invitation</h1>
        <button onClick={handleCreateIssuerInvitation}>Create Issuer Invitation</button>
        {issuerInvitation && (
          <div>
            <h3>Issuer Invitation Created:</h3>
            <pre>{JSON.stringify(issuerInvitation, null, 2)}</pre>
          </div>
        )}
        <button onClick={handleCreateVerifierInvitation}>Create Verifier Invitation</button>
        {verifierInvitation && (
          <div>
            <h3>Verifier Invitation Created:</h3>
            <pre>{JSON.stringify(verifierInvitation, null, 2)}</pre>
          </div>
        )}
        {error && <p>Error: {error}</p>}
        {presExId && <p>presentation_exchange_id: {presExId}</p>}
        <div>
          <h2>Fetch Proof Record</h2>
          <label>
            Enter Proof Record ID:
            <input
              type="text"
              value={recordId}
              onChange={handleChangeRecordId}
            />
          </label>
          <button onClick={handleFetchProofRecord}>Fetch Proof Record</button>
          {proofRecord && (
            <div>
              <h3>Proof Record Details:</h3>
              <pre>{JSON.stringify(proofRecord, null, 2)}</pre>
            </div>
          )}
        </div>
        <button onClick={handleSendProofRequest}>Send Proof Request</button>
        <div>
          <h2>Fetch  the attributes of Proof Record Detail</h2>
          <label>
            Enter Credential Record ID:
            <input
              type="text"
              value={credentialRecordId}
              onChange={handleChangeCredentialRecordId}
            />
          </label>
          <button onClick={handleFetchCredentialDetail}>Fetch Credential Detail</button>
        </div>
        <h1>Envoi du Credential from Issuer</h1><br></br>
        <CredentialForm />
      </header>
    </div>
  );
};

export default App;