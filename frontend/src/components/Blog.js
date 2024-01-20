import React from "react";
import { Input, Layout, Col, Row, Dropdown, Button, Typography } from "antd";
import "@fontsource/caveat";
import MyArticles from './MyArticles.js';
import { Route } from "react-router-dom";

const { Header, Content } = Layout;
const { Text } = Typography;

const onSearch = () => {
  return;
}

const linkToMyArticle = () => {
  window.location.href = "/myarticles";
}

const linkToArticleList = () => {
  window.location.href = "/";
}

const logOut = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
}

const returnDrowDownItems = () => {
  const items = [
    {
      key: '2',
      label: (
        <a onClick={logOut}>
          <img src="./logout.png" alt="" style={{width: "1vw"}}/> logout
        </a>
      )
    },
  ];
  if (window.location.pathname === '/') {
    items.unshift({
      key: '1',
      label: (
        <a onClick={linkToMyArticle}>
          <img src="./addArticles.png" alt="" style={{width: "1vw"}}/> My Aritcles
        </a>
      ),
    });
  } else {
    items.unshift({
      key: '1',
      label: (
        <a onClick={linkToArticleList}>
          <img src="./addArticles.png" alt="" style={{width: "1vw"}}/> Article List
        </a>
      ),
    });
  }
  
  return {items};
}

export default function Blog() {
  return (
    <Layout>
      <Header style={{ backgroundColor: "white" }}>
        <Row style={{  height: "8vh" }}>
          <Col span={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontFamily: "Caveat", fontSize: "5vh", cursor: "pointer"}} onClick={linkToArticleList}>Blog</Text>
          </Col>
          <Col span={16} style={{ display: "flex" , justifyContent: "center", alignItems: "center"}}>
            <Input.Search placeholder="input search text" onSearch={onSearch} style={{ width: "50vw" }} />
          </Col>
          <Col span={3} />
          <Col span={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Dropdown menu={returnDrowDownItems()} placement="bottomLeft" onClick={(event)=>{console.log(event)}} arrow>
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
