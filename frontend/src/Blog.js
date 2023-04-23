import ReactDOM from 'react-dom/client';
import React from 'react';
import LoginPage from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

export default function Blog() {
    return (
        <div calss="container">
            <label>文章列表</label><br></br>
            <input className="loginOutBtn" type="button" value="登出" onClick={logOut}/>
        </div>
    );
}

function logOut() {
    return root.render(
        <React.StrictMode>
            <LoginPage />
        </React.StrictMode>
    )
}