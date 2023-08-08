import React from 'react';

export default function Blog() {
    return (
        <div calss="container">
            <label>文章列表</label><br></br>
            <input className="loginOutBtn" type="button" value="登出" onClick={logOut}/>
        </div>
    );
}

function logOut() {
    localStorage.removeItem('accessToken');
    window.location.href = "/login";
    return;
}