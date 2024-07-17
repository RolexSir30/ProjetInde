// src/api.js

import axios from 'axios';

const ACA_PY_BASE_URL = 'http://localhost:11001'; // URL de votre agent ACA-Py

const api = axios.create({
  baseURL: ACA_PY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction pour créer une invitation out-of-band avec les données JSON spécifiées
export const createOutOfBandInvitation = async () => {
  try {
    const invitationData = {
      accept: [
        "didcomm/aip1",
        "didcomm/aip2;env=rfc19"
      ],
      alias: "Barry",
      goal: "To issue a Faber College Graduate credential",
      goal_code: "issue-vc",
      handshake_protocols: [
        "https://didcomm.org/didexchange/1.0"
      ],
      metadata: {},
      my_label: "Invitation to Barry",
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
  try {
    const response = await api.post('/issue-credential/send', formData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des informations d\'identification:', error.response);
    throw error;
  }
};
// Ajoutez d'autres fonctions pour interagir avec ACA-Py selon vos besoins
