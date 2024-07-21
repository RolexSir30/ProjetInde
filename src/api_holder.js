// api_holder.js

export const getCredentials = async () => {
    try {
      const response = await fetch('http://0.0.0.0:11002/credentials', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  
  export const receiveInvitation = async (invitation) => {
    try {
      const response = await fetch('http://0.0.0.0:11002/out-of-band/receive-invitation?auto_accept=true', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invitation)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  