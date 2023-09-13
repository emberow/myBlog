import React from "react";
import { Input, Layout, Col, Row, Dropdown, Button, Typography } from "antd";
import "@fontsource/caveat";
import MyArticles from './MyArticles';
import { Route } from "react-router-dom";

const { Header, Content } = Layout;
const { Text } = Typography;

const onSearch = () => {
  return;
}

function linkToMyArticle() {
  window.location.href = "/myarticles";
}

function logOut() {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
}

function home() {
  window.location.href = "/";
}

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
        <Route path="/myarticles" component={MyArticles} />
      </Content>
    </Layout>
  );
}
