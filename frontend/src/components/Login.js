import './Login.css';
import React from 'react';
import Blog from './Blog';
import {  Input, Tabs, Form, Checkbox, Button  } from 'antd';
import * as account from '../api/account';

const signIn = async (values) => {
  let token;
  try {
    token = await account.userLoginCheck(values);
    localStorage.setItem('accessToken', token);
    window.location.href = "/";
  } catch (err) {
    window.alert('login failed');
  }
  return;
};

const signInFail = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function SignIn() {
  return (
    <div>
      <Form
    name="basic"
    layout='vertical'
    initialValues={{
      remember: true,
    }}
    onFinish={signIn}
    onFinishFailed={signInFail}
    autoComplete="off"
  >
    <Form.Item
      label="UserName"
      name="userName"
      rules={[
        {
          required: true,
          message: 'Please input your UserName!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your Password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className="submitBtn" block>
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  );
}

function SignUp() {
  return (
    <div>
      <Form
    name="basic"
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    layout='vertical'
    onFinish={signIn}
    onFinishFailed={signInFail}
    autoComplete="off"
  >

    <Form.Item
      label="UserName"
      name="userName"
      rules={[
        {
          required: true,
          message: 'Please input your UserName!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your Password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      label="PasswordCheck"
      name="PasswordCheck"
      rules={[
        {
          required: true,
          message: 'Please input your PasswordCheck!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" className="submitBtn">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div calss="container">
      <div className="LoginForm">
        <div className="webName">
            <label>My Blog</label><br/>
        </div>
        <Tabs
          defaultActiveKey="1"
          centered
          items={[
               {
                label: `sign in`,
                key: 1,
                children: <SignIn />,
              },
              {
                label: `sign up`,
                key: 2,
                children: <SignUp />,
              }
          ]}
        />
      </div>
    </div>
  );
}


function login() {
  return (
    <React.StrictMode>
      <Blog />
    </React.StrictMode>
  )
}
