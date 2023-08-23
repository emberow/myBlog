import React, { useState } from "react";
import { Input, Layout, Menu, theme } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const onSearch = () => {
  return;
}

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

export default function Blog() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header style={{  height: "8vh", display: "flex", alignItems: "center", backgroundColor: "white" }}>
        <div className="demo-logo" />
        <Menu
          mode="horizontal"
          items={[{
            "key": "1",
            "label": "userinfo"
          }, {
            "key": "2",
            "label": "login"
          }]}
        />
      </Header>
      <Content>
        <Layout style={{ height: "92vh" }}>
          <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="demo-logo-vertical" />
            <Menu
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
            />
          </Sider>
        </Layout>
      </Content>
    </Layout>
  );
  // return (
  //     <div calss="container">
  //         <label>文章列表</label><br></br>
  //         <input className="loginOutBtn" type="button" value="登出" onClick={logOut}/>
  //     </div>
  // );
}

function logOut() {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
  return;
}
