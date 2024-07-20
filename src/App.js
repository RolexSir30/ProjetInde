import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HolderPage from './HolderPage';
import IssuerPage from './IssuerPage';
import VerifierPage from './VerifierPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="menu">
            <ul className="menu-list">
              <li className="menu-item"><Link to="/">Home</Link></li>
              <li className="menu-item"><Link to="/holder">Holder</Link></li>
              <li className="menu-item"><Link to="/issuer">Issuer</Link></li>
              <li className="menu-item"><Link to="/verifier">Verifier</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={
              <div>
                <h1>Welcome to the Identity Management System</h1>
                <p>Select a role to continue.</p>
              </div>
            } />
            <Route path="/holder" element={<HolderPage />} />
            <Route path="/issuer" element={<IssuerPage />} />
            <Route path="/verifier" element={<VerifierPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
};

export default App;
