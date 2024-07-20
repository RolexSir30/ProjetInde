import React, { useState } from 'react';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';
import { createOutOfBandInvitation } from './api';
import CredentialForm from './components/CredentialForm';

const IssuerPage = () => {
  const [issuerInvitation, setIssuerInvitation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateIssuerInvitation = async () => {
    setLoading(true);
    setError(null);
    try {
      const invitationData = await createOutOfBandInvitation();
      setIssuerInvitation(invitationData);
      console.log('Invitation created from Issuer:', invitationData);
    } catch (error) {
      setError(error.message || 'Error creating Issuer invitation');
      console.error('Error creating Issuer invitation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Issuer Page
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCreateIssuerInvitation}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Issuer Invitation'}
            </Button>
          </Grid>
          {issuerInvitation && (
            <Grid item xs={12}>
              <Paper
                elevation={3}
                style={{
                  padding: '16px',
                  maxHeight: '300px',
                  overflow: 'auto',
                }}
              >
                <Typography variant="h6">Issuer Invitation Created:</Typography>
                <pre>{JSON.stringify(issuerInvitation, null, 2)}</pre>
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
          <Grid item xs={12}>
            <CredentialForm />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default IssuerPage;
