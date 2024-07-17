import axios from 'axios';

const VERIF_URL = 'http://0.0.0.0:11003'; // URL de votre agent ACA-Py

const api = axios.create({
  baseURL: VERIF_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  },
});

export const createOutOfBandInvitation = async () => {
  try {
    const invitationData = {
      accept: ["didcomm/aip1", "didcomm/aip2;env=rfc19"],
      alias: "Verifier", // Nom du vérificateur
      goal: "To issue a passport", // But de l'invitation
      goal_code: "issue-vc", // Code du but
      handshake_protocols: ["https://didcomm.org/didexchange/1.0"], // Protocoles de poignée de main
      metadata: {}, // Métadonnées (optionnelles)
      my_label: "Invitation from the Verifier", // Étiquette personnalisée
      protocol_version: "1.1" // Version du protocole
    };

    const response = await api.post('/out-of-band/create-invitation?auto_accept=true', invitationData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'invitation out-of-band:', error.response);
    throw error;
  }
};

export const sendProofRequest = async (connectionId) => {
  const data = {
    connection_id: connectionId,
    presentation_request: {
      indy: {
        name: "new_proof",
        version: "1.0",
        requested_attributes: {
          passport_number: {
            name: "passport_number",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:35:default"
              }
            ]
          },
          name: {
            name: "name",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:35:default"
              }
            ]
          },
          date_of_birth: {
            name: "date_of_birth",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:35:default"
              }
            ]
          },
          nationality: {
            name: "nationality",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:35:default"
              }
            ]
          },
          date_of_issue: {
            name: "date_of_issue",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:35:default"
              }
            ]
          },
          date_of_expiry: {
            name: "date_of_expiry",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:35:default"
              }
            ]
          },
          issuer: {
            name: "issuer",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:35:default"
              }
            ]
          },
          photo_url: {
            name: "photo_url",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:35:default"
              }
            ]
          }
        },
        requested_predicates: {}
      }
    },
    comment: "new_proof",
    trace: false,
    auto_remove: false
  };

  try {
    const response = await api.post('/present-proof-2.0/send-request', data);
    return response.data;
  } catch (error) {
    console.error('Error sending proof request:', error);
    throw error;
  }
};

export const fetchProofRecord = async (recordId) => {
  try {
    const response = await api.get(`/present-proof-2.0/records/${recordId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching proof record ${recordId}:`, error);
    throw error;
  }
};
