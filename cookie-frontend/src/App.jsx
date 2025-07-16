import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const API = 'https://task-33-ef02.onrender.com';

function App() {
  const [response, setResponse] = useState('');

  const setCookie = async () => {
    const res = await axios.get(`${API}/set-cookie`);
    setResponse(JSON.stringify(res.data));
  };

  const getCookie = async () => {
    try {
      const res = await axios.get(`${API}/get-cookie`);
      setResponse(JSON.stringify(res.data));
    } catch (err) {
      setResponse(JSON.stringify(err.response.data));
    }
  };

  const testStatus = async (code) => {
    try {
      const res = await axios.get(`${API}/status/${code}`);
      setResponse(`Status ${code}: ${JSON.stringify(res.data)}`);
    } catch (err) {
      setResponse(`Status ${code}: ${JSON.stringify(err.response.data)}`);
    }
  };

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

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '1rem' }}>Cookie & Status Demo</h2>

      <div>
        <button style={buttonStyle} onClick={setCookie}>Set Cookie</button>
        <button style={{ ...buttonStyle, backgroundImage: 'linear-gradient(315deg, #6a11cb 0%, #2575fc 74%)' }} onClick={getCookie}>
          Get Cookie
        </button>
      </div>

      <h3 style={{ marginTop: '2rem' }}>Status Tests</h3>
      <div>
        {[200, 201, 303, 206, 301, 302].map(code => (
          <button
            key={code}
            onClick={() => testStatus(code)}
            style={buttonStyle}
          >
            {code}
          </button>
        ))}
      </div>

      <pre style={responseBoxStyle}>
        {response}
      </pre>
    </div>
  );
}

export default App;
