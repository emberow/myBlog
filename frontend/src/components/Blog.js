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
            <img src="../logout.png" alt="" style={{width: "1vw"}}/>
              <div className='Chakra-Petch'>
                &nbsp;logout
              </div>
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
            <img src="../login.png" alt="" style={{width: "1vw"}}/>
            <div className='Chakra-Petch'>
              &nbsp;login
            </div>
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
          <img src="../addArticles.png" alt="" style={{width: "1vw"}}/>
          <div className='Chakra-Petch'>
            &nbsp;My Aritcles
          </div>
        </a>
      ),
    });
  } 

  if (window.location.pathname !=('/articleList')) {
    items.unshift({
      key: '2',
      label: (
        <a onClick={linkToArticleList} style={{ display: "flex", alignItems: "center" }}>
          <img src="../addArticles.png" alt="" style={{width: "1vw"}}/>
          <div className='Chakra-Petch'>
            &nbsp;Article List
          </div>
        </a>
      ),
    });
  }

  return {items};
}

export default function Blog() {
  const userName = localStorage.getItem('userName');
  console.log(window.location.href)

  return (
    <Layout style={{ minHeight: (window.location.pathname == '/login') ? "0vh" : "100vh", minWidth: "100vw" }}>
      <Header style={{ backgroundColor: "white", display: (window.location.pathname == '/login') ? 'none' : 'block' }}>
        <Row style={{  height: "8vh" }}>
          <Col span={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className='Chakra-Petch' style={{ fontSize: "5vh", cursor: "pointer"}} onClick={linkToArticleList}>Blog</div>
          </Col>
          <Col span={16} style={{ display: "flex" , justifyContent: "center", alignItems: "center"}}>
            <Input.Search placeholder="input search text" onSearch={onSearch} style={{ width: "50vw" }} allowClear />
          </Col>
          <Col span={3} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width:"1.5vw" }} src="../user-interface.png" />
            <div className='Chakra-Petch'>&nbsp;{userName ? userName : "guest"}</div>
          </Col>
          <Col span={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Dropdown menu={returnDrowDownItems()} placement="bottomLeft" onClick={(event)=>{console.log(event)}} arrow>
              <Button>
                <div className='Chakra-Petch'>
                  menu 
                </div>
              </Button>
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
