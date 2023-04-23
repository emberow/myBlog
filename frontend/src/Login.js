import ReactDOM from 'react-dom/client';
import './Login.css';
import React from 'react';
import Blog from './Blog';

const root = ReactDOM.createRoot(document.getElementById('root'));

export default function LoginPage() {
  return (
    <div calss="container">
      <div className="webName">
          <label>My Blog</label><br/>
      </div>
      <div className="LoginForm">
        <div className="account">
            <label for="account">account</label><br></br>
            <input  type="text" id="account" name="name" autoFocus />
        </div>
        <div className="password">
            <label for="password">password</label><br></br>
            <input  type="text" id="password" name="name" autoFocus />
        </div>
        <input className="createAccountBtn" type="button" value="建立帳戶" /><br/>
        <input className="loginBtn" type="button" value="登入" onClick={login} />
      </div>
    </div>
  );
}


function login() {
  return root.render(
    <React.StrictMode>
      <Blog />
    </React.StrictMode>
  )
}


