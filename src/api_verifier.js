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
  const currentDate = new Date().toISOString().split('T')[0]; // Obtenez la date actuelle au format YYYY-MM-DD

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
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:37:default"
              }
            ]
          },
          name: {
            name: "name",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:37:default"
              }
            ]
          },
          firstname: {
            name: "firstname",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:37:default"
              }
            ]
          },
          date_of_birth: {
            name: "date_of_birth",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:37:default"
              }
            ]
          },
          nationality: {
            name: "nationality",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:37:default"
              }
            ]
          },
          date_of_issue_dateint: {
            name: "date_of_issue_dateint",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:37:default"
              }
            ]
          },
          date_of_expiry_dateint: {
            name: "date_of_expiry_dateint",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:37:default"
              }
            ]
          },
          issuer: {
            name: "issuer",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:37:default"
              }
            ]
          },
          photo_url: {
            name: "photo_url",
            restrictions: [
              {
                cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:37:default"
              }
            ]
          }
        },
        requested_predicates: {
          
        }
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
    console.log('Response from API:', response.data); // Vérifiez le contenu et le type de response.data
    
    // Assurez-vous que response.data est un objet
    if (typeof response.data === 'object') {
      // Exemple: accéder à une propriété spécifique de l'objet JSON
      const proofRecord = {

        data : response.data.verified,

        // Ajoutez d'autres propriétés nécessaires ici
      };
      console.log(proofRecord);
      return proofRecord;
    } else {
      throw new Error('Response data is not an object');
    }
  } catch (error) {
    console.error(`Error fetching proof record ${recordId}:`, error);
    throw error;
  }
};

export const credentialDetail = async (recordId) => {
  try {
    const response = await api.get(`/present-proof-2.0/records/${recordId}`);
    console.log('Response from API:', response.data); // Vérifiez le contenu et le type de response.data
    
    // Assurez-vous que response.data est un objet
    if (typeof response.data === 'object') {
      // Exemple: accéder à une propriété spécifique de l'objet JSON
      const proofRecord = {

        data : response.data.by_format.pres.indy.requested_proof.revealed_attrs,

        // Ajoutez d'autres propriétés nécessaires ici
      };
      console.log(proofRecord);
      return proofRecord;
    } else {
      throw new Error('Response data is not an object');
    }
  } catch (error) {
    console.error(`Error fetching proof record ${recordId}:`, error);
    throw error;
  }
};