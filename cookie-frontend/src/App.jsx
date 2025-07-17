import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const setCookie = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/set-cookie`);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponse(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getCookie = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/get-cookie`);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponse(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testStatus = async (code) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/status/${code}`);
      setResponse(`Status ${res.status}: ${JSON.stringify(res.data, null, 2)}`);
    } catch (err) {
      setResponse(`Status ${err.response?.status || 'Error'}: ${JSON.stringify(err.response?.data || {message: err.message}, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  // ... (keep your existing styles)

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '1rem' }}>Cookie & Status Demo</h2>
      
      {loading && <p>Loading...</p>}

      <div>
        <button style={buttonStyle} onClick={setCookie} disabled={loading}>
          Set Cookie
        </button>
        <button 
          style={{ ...buttonStyle, backgroundImage: 'linear-gradient(315deg, #6a11cb 0%, #2575fc 74%)' }} 
          onClick={getCookie}
          disabled={loading}
        >
          Get Cookie
        </button>
      </div>

      <h3 style={{ marginTop: '2rem' }}>Status Tests</h3>
      <div>
        {[200, 201, 400, 404, 500].map(code => (
          <button
            key={code}
            onClick={() => testStatus(code)}
            style={buttonStyle}
            disabled={loading}
          >
            {code}
          </button>
        ))}
      </div>

      <pre style={responseBoxStyle}>
        {response || 'Response will appear here...'}
      </pre>
    </div>
  );
}

export default App;

  const containerStyle = {
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    minHeight: '100vh',
    color: '#f0f0f0',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const buttonStyle = {
    margin: '0.5rem',
    padding: '0.7rem 1.4rem',
    background: '#00c6ff',
    backgroundImage: 'linear-gradient(315deg, #00c6ff 0%, #0072ff 74%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s ease-in-out'
  };

  const responseBoxStyle = {
    marginTop: '2rem',
    backgroundColor: '#1e1e2f',
    color: '#0ff',
    padding: '1rem',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '600px',
    overflowX: 'auto',
    boxShadow: '0 0 15px rgba(0,255,255,0.2)',
    fontFamily: 'monospace'
  };
