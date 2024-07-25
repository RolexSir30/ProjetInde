import React, { useState } from 'react';
import { getCredentials, receiveInvitation, generateQrData } from './api_holder';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import QRCode from 'qrcode.react'; // Import QRCode component

// Style for the TextField with a white border and label color
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: 'white', // Set text color to white
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

const HolderPage = () => {
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invitation, setInvitation] = useState('');
  const [apiUrl, setApiUrl] = useState(''); // Remove the default API URL
  const [qrData, setQrData] = useState('');

  const handleGetCredentials = async () => {
    setLoading(true);
    const data = await getCredentials(apiUrl);
    setCredentials(data);
    setLoading(false);
    setQrData(generateQrData(apiUrl)); // Generate QR code data URL when getting credentials
  };

  const handleReceiveInvitation = async () => {
    try {
      const invitationJson = JSON.parse(invitation);
      setLoading(true);
      const response = await receiveInvitation(apiUrl, invitationJson);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error('Invalid JSON format:', error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Holder Page
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledTextField
              label="API URL"
              variant="outlined"
              fullWidth
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleGetCredentials}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Credentials'}
            </Button>
          </Grid>
          {credentials && (
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
                <Typography variant="h6" gutterBottom>
                  Credentials:
                </Typography>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(credentials, null, 2)}
                </pre>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12}>
            <StyledTextField
              label="Invitation JSON"
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              value={invitation}
              onChange={(e) => setInvitation(e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleReceiveInvitation}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Receive Invitation'}
            </Button>
          </Grid>
          {qrData && (
            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Scan the QR Code to Fetch Credentials:
              </Typography>
              <QRCode value={qrData} size={256} /> {/* Generate QR code */}
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default HolderPage;
