import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPage from './components/Login';
import Blog from './components/Blog';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Redirect, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route 
        path="/login"
        render={() => (
          localStorage.getItem('accessToken')
          ? <Redirect to="/" />
          : <LoginPage />
        )}
      />
      <Route 
        path="/"
        render={() => (
          localStorage.getItem('accessToken')
          ? <Blog />
          : <Redirect to="/login" />
        )}
      />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
