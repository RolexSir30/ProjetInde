// HolderPage.js

import React, { useState } from 'react';
import { getCredentials } from './api_holder';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const HolderPage = () => {
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const data = await getCredentials();
    setCredentials(data);
    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Holder Page
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClick}
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
        </Grid>
      </Box>
    </Container>
  );
};

export default HolderPage;
