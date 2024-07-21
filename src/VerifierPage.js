// VerifierPage.js

import React, { useState } from 'react';
import {
  Container, Typography, Button, TextField, Box, Grid, Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  createOutOfBandInvitation as createVerifierInvitation,
  sendProofRequest,
  fetchProofRecord,
  credentialDetail
} from './api_verifier';

// Style for the TextField with a white border and label color
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // Set border color to white
    },
    '&:hover fieldset': {
      borderColor: 'lightgray', // Change border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', // Set border color when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: 'white', // Set label color to white
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'white', // Set label color to white when focused
  },
}));

const VerifierPage = () => {
  const [verifierInvitation, setVerifierInvitation] = useState(null);
  const [error, setError] = useState(null);
  const [presExId, setPresExId] = useState(null);
  const [proofRecord, setProofRecord] = useState(null);
  const [recordId, setRecordId] = useState('');
  const [credentialRecordId, setCredentialRecordId] = useState('');
  const [credentialDetailRecord, setCredentialDetailRecord] = useState(null);
  const [connectionId, setConnectionId] = useState('');

  const handleChangeRecordId = (event) => {
    setRecordId(event.target.value);
  };

  const handleChangeCredentialRecordId = (event) => {
    setCredentialRecordId(event.target.value);
  };

  const handleChangeConnectionId = (event) => {
    setConnectionId(event.target.value);
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
      setCredentialDetailRecord(response);
      console.log('Credential detail fetched:', response);
    } catch (error) {
      setError(error.message || 'Error fetching credential detail');
      console.error('Error fetching credential detail:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Verifier Page
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCreateVerifierInvitation}
            >
              Create Verifier Invitation
            </Button>
          </Grid>
          {verifierInvitation && (
            <Grid item xs={12}>
              <Paper
                elevation={3}
                style={{
                  padding: '16px',
                  maxHeight: '300px',
                  overflow: 'auto',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6" style={{ color: 'black' }}>
                  Verifier Invitation Created:
                </Typography>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(verifierInvitation, null, 2)}
                </pre>
              </Paper>
            </Grid>
          )}
          {error && (
            <Grid item xs={12}>
              <Typography variant="body1" color="error">
                Error: {error}
              </Typography>
            </Grid>
          )}
          {presExId && (
            <Grid item xs={12}>
              <Typography variant="body1">
                presentation_exchange_id: {presExId}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h6" style={{ color: 'white' }}>
              Fetch Proof Record
            </Typography>
            <StyledTextField
              label="Enter Proof Record ID"
              value={recordId}
              onChange={handleChangeRecordId}
              variant="outlined"
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFetchProofRecord}
              fullWidth
            >
              Fetch Proof Record
            </Button>
          </Grid>
          {proofRecord && (
            <Grid item xs={12}>
              <Paper
                elevation={3}
                style={{
                  padding: '16px',
                  maxHeight: '300px',
                  overflow: 'auto',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6" style={{ color: 'black' }}>
                  Proof Record Details:
                </Typography>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(proofRecord, null, 2)}
                </pre>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h6" style={{ color: 'white' }}>
              Send Proof Request
            </Typography>
            <StyledTextField
              label="Enter Connection ID"
              value={connectionId}
              onChange={handleChangeConnectionId}
              variant="outlined"
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendProofRequest}
              fullWidth
            >
              Send Proof Request
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" style={{ color: 'white' }}>
              Fetch the attributes of Proof Record Detail
            </Typography>
            <StyledTextField
              label="Enter Credential Record ID"
              value={credentialRecordId}
              onChange={handleChangeCredentialRecordId}
              variant="outlined"
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFetchCredentialDetail}
              fullWidth
            >
              Fetch Credential Detail
            </Button>
          </Grid>
          {credentialDetailRecord && (
            <Grid item xs={12}>
              <Paper
                elevation={3}
                style={{
                  padding: '16px',
                  maxHeight: '300px',
                  overflow: 'auto',
                  backgroundColor: 'white',
                }}
              >
                <Typography variant="h6" style={{ color: 'black' }}>
                  Credential Detail:
                </Typography>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(credentialDetailRecord, null, 2)}
                </pre>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default VerifierPage;
