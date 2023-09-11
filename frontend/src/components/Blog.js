import React, { useState } from "react";
import { Input, Layout, Menu, Col, Row, Dropdown, Button, Typography } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "@fontsource/caveat";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

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

function linkToMyArticle() {
  window.location.href = "/login";
}

function logOut() {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
}

function home() {
  window.location.href = "/";
}

const sideBarItems = [
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
];

const items = [
  {
    key: '1',
    label: (
      <Text onClick={linkToMyArticle}>
        <img src="./addArticles.png" alt="" style={{width: "1vw"}}/> my aritcles
      </Text>
    ),
  },
  {
    key: '2',
    label: (
      <Text onClick={logOut}>
        <img src="./logout.png" alt="" style={{width: "1vw"}}/> logout
      </Text>
    ),
  },
];

export default function Blog() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Header style={{ backgroundColor: "white" }}>
        <Row style={{  height: "8vh" }}>
          <Col span={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontFamily: "Caveat", fontSize: "5vh", cursor: "pointer"}} onClick={home}>Blog</Text>
          </Col>
          <Col span={16} style={{ display: "flex" , justifyContent: "center", alignItems: "center"}}>
            <Input.Search placeholder="input search text" onSearch={onSearch} style={{ width: "50vw" }} />
          </Col>
          <Col span={3} />
          <Col span={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <Button>menu</Button>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content>
        <Layout style={{ height: "92vh" }}>
          <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={sideBarItems}
            />
          </Sider>
        </Layout>
      </Content>
    </Layout>
  );
}
