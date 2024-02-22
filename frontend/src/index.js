import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPage from './components/Login.js';
import Blog from './components/Blog.js';
import reportWebVitals from './reportWebVitals.js';
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
          <Blog />
        )}
      />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
