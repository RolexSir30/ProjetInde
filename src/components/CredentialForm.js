// src/components/CredentialForm.js

import React, { useState } from 'react';
import { sendCredential } from '../api'; // Assurez-vous que le chemin est correct

const CredentialForm = () => {
  const [formData, setFormData] = useState({
    passport_number: '',
    name: '',
    date_of_birth: '',
    nationality: '',
    date_of_issue: new Date().toISOString().split('T')[0], // Date actuelle
    date_of_expiry_dateint: new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0], // 10 ans après la date actuelle
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
    <form onSubmit={handleSubmit}>
      <label>
        Passport Number:
        <input type="text" name="passport_number" value={formData.passport_number} onChange={handleChange} />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        First Name:
        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
      </label>
      <label>
        Date of Birth:
        <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
      </label>
      <label>
        Nationality:
        <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
      </label>
      <label>
        Date of Issue:
        <input type="dateint" name="date_of_issue" value={formData.date_of_issue} onChange={handleChange} />
      </label>
      <label>
        Date of Expiry:
        <input type="dateint" name="date_of_expiry_dateint" value={formData.date_of_expiry} onChange={handleChange} />
      </label>
      <label>
        
        Issuer:
        <input type="text" name="issuer" value={formData.issuer} onChange={handleChange} />
      </label>
      <label>
        Photo URL:
        <input type="text" name="photo_url" value={formData.photo_url} onChange={handleChange} />
      </label>
      <label>
        Connection ID:
        <input type="text" name="connection_id" value={formData.connection_id} onChange={handleChange} />
      </label>
      <button type="submit">Send Credential</button>
    </form>
  );
};

export default CredentialForm;
