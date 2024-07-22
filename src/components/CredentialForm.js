// src/components/CredentialForm.js

import React, { useState } from 'react';
import { sendCredential } from '../api'; // Assurez-vous que le chemin est correct

const CredentialForm = () => {
  const [formData, setFormData] = useState({
    passport_number: '',
    name: '',
    firstname: '',
    date_of_birth: '',
    nationality: '',
    date_of_issue: new Date().toISOString().split('T')[0], // Date actuelle
    date_of_expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0], // 10 ans après la date actuelle
    issuer: '',
    photo_url: '',
    connection_id: 'bf9850a2-6dcc-4c1d-9862-bd1f4e69c144' // Par défaut
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentialData = {
        ...formData,
        credential_preview: {
          "@type": "https://didcomm.org/issue-credential/2.0/credential-preview",
          attributes: Object.entries(formData).map(([name, value]) => ({ name, value })),
        },
        filter: {
          indy: {
            cred_def_id: "HUQUGuQDrk6NsQDDsELbYs:3:CL:33:default",
          }
        }
      };
      const response = await sendCredential(credentialData);
      console.log('Credential sent successfully:', response);
    } catch (error) {
      console.error('Error sending credential:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <input 
          type="text" 
          name="passport_number" 
          value={formData.passport_number} 
          onChange={handleChange} 
          placeholder="Passport Number" 
          style={styles.input} 
        />
      </div>
      <div style={styles.formGroup}>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Name" 
          style={styles.input} 
        />
      </div>
      <div style={styles.formGroup}>
        <input 
          type="text" 
          name="firstname" 
          value={formData.firstname} 
          onChange={handleChange} 
          placeholder="First Name" 
          style={styles.input} 
        />
      </div>
      <div style={styles.formGroup}>
        <input 
          type="date" 
          name="date_of_birth" 
          value={formData.date_of_birth} 
          onChange={handleChange} 
          placeholder="Date of Birth" 
          style={styles.input} 
        />
      </div>
      <div style={styles.formGroup}>
        <input 
          type="text" 
          name="nationality" 
          value={formData.nationality} 
          onChange={handleChange} 
          placeholder="Nationality" 
          style={styles.input} 
        />
      </div>
      <div style={styles.formGroup}>
        <input 
          type="date" 
          name="date_of_issue" 
          value={formData.date_of_issue} 
          onChange={handleChange} 
          placeholder="Date of Issue" 
          style={styles.input} 
        />
      </div>
      <div style={styles.formGroup}>
        <input 
          type="date" 
          name="date_of_expiry" 
          value={formData.date_of_expiry} 
          onChange={handleChange} 
          placeholder="Date of Expiry" 
          style={styles.input} 
        />
      </div>
      <div style={styles.formGroup}>
        <input 
          type="text" 
          name="issuer" 
          value={formData.issuer} 
          onChange={handleChange} 
          placeholder="Issuer" 
          style={styles.input} 
        />
      </div>
      <div style={styles.formGroup}>
        <input 
          type="text" 
          name="photo_url" 
          value={formData.photo_url} 
          onChange={handleChange} 
          placeholder="Photo URL" 
          style={styles.input} 
        />
      </div>
      <div style={styles.formGroup}>
        <input 
          type="text" 
          name="connection_id" 
          value={formData.connection_id} 
          onChange={handleChange} 
          placeholder="Connection ID" 
          style={styles.input} 
        />
      </div>
      <button type="submit" style={styles.button}>Send Credential</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CredentialForm;
