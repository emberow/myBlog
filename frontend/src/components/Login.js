import './Login.css';
import React from 'react';
import {  Input, Tabs, Form, Checkbox, Button, message } from 'antd';
import * as account from '../api/account';


const apiFail = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function SignIn() {
  const signIn = async (values) => {
    let token;
    try {
      token = await account.userLoginCheck(values);
      localStorage.setItem('accessToken', token);
      await message.success('login successed', 1);
      if (values.remember === true) {
        localStorage.setItem('accessToken', token);
      } else {
        localStorage.removeItem('accessToken');
      }
      window.location.href = "/";
    } catch (err) {
      message.error('login failed', 3);
    }
    return;
  };

  return (
    <div>
      <Form
    name="basic"
    layout='vertical'
    initialValues={{
      remember: true,
    }}
    onFinish={signIn}
    onFinishFailed={apiFail}
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
      <Checkbox>keep login</Checkbox>
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
  const signUp = async (values) => {
    try {
      if (values.passwordCheck === values.password) {
        await account.userSingUp(values);
        await message.success('registration successful', 1);
        window.location.href = "/";
      } else {
        message.error('PASSWORD_CHECK_NOT_MATCH', 3);
      }
    } catch (err) {
      message.error(err.response.data.message, 3);
    }
    return;
  };

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
    onFinish={signUp}
    onFinishFailed={apiFail}
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
      name="passwordCheck"
      rules={[
        {
          required: true,
          message: 'Please input your PasswordCheck!',
        },
      ]}
    >
      <Input.Password />
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
