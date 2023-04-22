import { useState } from 'react';
import './Login.css';

export default function Login() {
    return (
      <div calss="container">
        <div class="webName">
            <label>My Blog</label><br/>
        </div>
        <div className="LoginForm">
          <div className="account">
              <label for="account">account</label><br></br>
              <input  type="text" id="account" name="name" autofocus />
          </div>
          <div className="password">
              <label for="password">password</label><br></br>
              <input  type="text" id="password" name="name" autofocus />
          </div>
          <input class="createAccountBtn" type="button" value="建立帳戶" /><br/>
          <input class="loginBtn" type="button" value="登入" />
        </div>
      </div>
    );
  }