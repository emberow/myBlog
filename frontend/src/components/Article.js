import './articleList.css';
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { getArticle } from "../api/articles.js";
import MDEditor from '@uiw/react-md-editor';
import { Layout, Col, Row } from "antd";

const { Header, Content } = Layout;
const init = async(id, setArticle) => {
  const tempArticle = await getArticle(id);
  setArticle(tempArticle);
}

export default function Articles() {
  const history = useHistory();
  const { id } = useParams();
  const [article, setArticle] = useState({
    "id": null,
    "name": null,
    "content": "",
    "updateTime": null,
    "isPublish": null,
  });

  useEffect(() => {
    init(id, setArticle);
  }, []);

  return (
    <Layout>
      <div style={{ background: "rgb(245,245,245)", paddingTop: "0.5vh" }}>
        <Header style={{ background: "white"}}>
          <Row>
            <Col span={5} style={{ display: "flex", alignItems: "center" }}>
              <img src="../return.png" style={{ cursor: "pointer", height: "5vh" }} onClick={()=>{
                history.goBack();
              }} />
            </Col>
            <Col span={5} style={{ display: "flex", alignItems: "center" }}>
              <img style={{ width:"1.5vw" }} src="../addArticles.png" />
              &nbsp;{article.name}
            </Col>
            <Col span={5} style={{ display: "flex", alignItems: "center" }}>
              <img style={{ width:"1.5vw" }} src="../user-interface.png" />
              &nbsp;{article?.articleFolder?.userName}
            </Col>
            <Col span={5} style={{ display: "flex", alignItems: "center" }}>
              <img style={{ width:"1.5vw" }} src="../clock.png" /> 
              &nbsp;{article?.updateTime?.substr(0, 10)}
            </Col>
          </Row>
        </Header>
      </div>
      <Content  style={{ minHeight: "100%", minWidth: "100%", paddingTop: "0.5vh"}}>
        <div className="container" style={{ display: "inline" }}  data-color-mode="light">
          <MDEditor
            style={{ minHeight: "100%", borderRadius: "0 0 0 10px" }}
            value={article?.content}
            preview="preview"
            hideToolbar={true}
          />
        </div>
      </Content>
    </Layout>
  );
}