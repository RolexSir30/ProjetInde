// src/api.js

import axios from 'axios';

const ACA_PY_BASE_URL = 'http://localhost:11001'; // URL de votre agent ACA-Py

const api = axios.create({
  baseURL: ACA_PY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createOutOfBandInvitation = async () => {
  try {
    const invitationData = {
      accept: ["didcomm/aip1", "didcomm/aip2;env=rfc19"],
      alias: "Issuer",
      goal: "To issue a passport",
      goal_code: "issue-vc",
      handshake_protocols: ["https://didcomm.org/didexchange/1.0"],
      metadata: {},
      my_label: "Invitation from the Issuer",
      protocol_version: "1.1"
    };

    const response = await api.post('/out-of-band/create-invitation?auto_accept=true', invitationData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'invitation out-of-band:', error.response);
    throw error;
  }
};

// Fonction pour envoyer les informations de credential
export const sendCredential = async (formData) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 10);

  const credentialData = {
    credential_preview: {
      "@type": "https://didcomm.org/issue-credential/2.0/credential-preview",
      "attributes": [
        { "name": "passport_number", "value": formData.passport_number },
        { "name": "name", "value": formData.name },
        { "name": "firstname", "value": formData.firstname },
        { "name": "date_of_birth", "value": formData.date_of_birth },
        { "name": "nationality", "value": formData.nationality },
        { "name": "date_of_issue", "value": currentDate },
        { "name": "date_of_expiry", "value": expiryDate.toISOString().split('T')[0] },
        { "name": "issuer", "value": formData.issuer },
        { "name": "photo_url", "value": formData.photo_url }
      ]
    },
    connection_id: formData.connection_id || "bf9850a2-6dcc-4c1d-9862-bd1f4e69c144",
    filter: {
      indy: {
        cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:37:default"
      }
    }
  };

  try {
    const response = await api.post('/issue-credential-2.0/send', credentialData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des informations d\'identification:', error.response);
    throw error;
  }
};