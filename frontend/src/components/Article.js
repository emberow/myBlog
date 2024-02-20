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
      <Header style={{ background: "white"}}>
        <Row>
          <Col span={5} style={{height: "10vh"}}>
            <img src="../return.png" style={{ cursor: "pointer", alignItems: "center",justifyContent: "center", height: "50%" }} onClick={()=>{
              history.goBack();
            }} />
          </Col>
          <Col span={5}>
            <b>ArticleName: {article.name}</b>
          </Col>
          <Col span={5}>
            <b>Author: {article?.articleFolder?.userName}</b>
          </Col>
          <Col span={5}>
            <b>
              UpdateTime: {
                article?.updateTime?.substr(0, 10)
              }
            </b>
          </Col>
        </Row>
      </Header>
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