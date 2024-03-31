import React from "react";
import { Input, Layout, Col, Row, Dropdown, Button, Typography } from "antd";
import "@fontsource/caveat";
import MyArticles from './MyArticles.js';
import Article from './Article.js';
import { Route } from "react-router-dom";
import ArticleList from "./ArticleList.js";
import { Redirect } from "react-router-dom";

const { Header, Content } = Layout;
const { Text } = Typography;

const onSearch = (value) => {
  if (!value) {
    window.location.href = `/articleList`;
  } else {
    window.location.href = `/articleList/?search=${value}`;
  }
  return;
}

const linkToMyArticle = () => {
  window.location.href = "/myarticles";
}

const linkToArticleList = () => {
  window.location.href = "/articleList";
}

const logOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
  document.location.reload();
}

const returnDrowDownItems = () => {
  const items = [];
  if (localStorage.getItem('accessToken')) {
    items.unshift(
      {
        key: '0',
        label: (
          <a onClick={logOut} style={{ display: "flex", alignItems: "center" }}>
            <img src="../logout.png" alt="" style={{width: "1vw"}}/>&nbsp;logout
          </a>
        )
      },
    );
  } else {
    items.unshift(
      {
        key: '0',
        label: (
          <a href="/login" style={{ display: "flex", alignItems: "center" }}>
            <img src="../login.png" alt="" style={{width: "1vw"}}/>&nbsp;login
          </a>
        )
      },
    );
  }

  if (window.location.pathname !== '/myarticles' && localStorage.getItem('accessToken')) {
    items.unshift({
      key: '1',
      label: (
        <a onClick={linkToMyArticle} style={{ display: "flex", alignItems: "center" }}>
          <img src="../addArticles.png" alt="" style={{width: "1vw"}}/>&nbsp;My Aritcles
        </a>
      ),
    });
  } 

  if (window.location.pathname !=('/articleList')) {
    items.unshift({
      key: '2',
      label: (
        <a onClick={linkToArticleList} style={{ display: "flex", alignItems: "center" }}>
          <img src="../addArticles.png" alt="" style={{width: "1vw"}}/>&nbsp;Article List
        </a>
      ),
    });
  }

  return {items};
}

export default function Blog() {
  const userName = localStorage.getItem('userName');

  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Header style={{ backgroundColor: "white" }}>
        <Row style={{  height: "8vh" }}>
          <Col span={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: "5vh", cursor: "pointer"}} onClick={linkToArticleList}>Blog</Text>
          </Col>
          <Col span={16} style={{ display: "flex" , justifyContent: "center", alignItems: "center"}}>
            <Input.Search placeholder="input search text" onSearch={onSearch} style={{ width: "50vw" }} allowClear />
          </Col>
          <Col span={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width:"1.5vw" }} src="../user-interface.png" />
            <div>&nbsp;{userName ? userName : "guest"}</div>
          </Col>
          <Col span={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Dropdown menu={returnDrowDownItems()} placement="bottomLeft" onClick={(event)=>{console.log(event)}} arrow>
              <Button>menu</Button>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content style={{ display: "grid" }}>
        <Route path="/articleList/" component={ArticleList} />
        <Route path="/myarticles" component={MyArticles} />
        <Route path="/article/:id" component={Article} />
        <Route exact path="/">
          <Redirect to="/articleList" />
        </Route>
      </Content>
    </Layout>
  );
}
