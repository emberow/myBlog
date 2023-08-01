import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPage from './components/Login';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
);

reportWebVitals();
