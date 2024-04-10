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
    <>
      <Row style={{ padding: "0.5vh" }}>
        <Col style={{ backgroundColor: "white", borderRadius: "0vw 1vw 1vw 0vw" }} span={3}/>
        <Col span={18}>
          <div style={{ display: "flex", height:"100%", backgroundColor: "rgb(245, 245, 245)", padding: "0vh 0.5vh 0 0.5vh" }}>
            <Layout>
              <div style={{ background: "rgb(245,245,245)" }}>
                <Header style={{ background: "white", borderRadius: "10px 10px 0 0" }}>
                  <Row>
                    <Col span={3} style={{ display: "flex", alignItems: "center" }}>
                      <img src="../return.png" style={{ cursor: "pointer", height: "5vh" }} onClick={()=>{
                        history.goBack();
                      }} />
                    </Col>
                    <Col span={7} style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ width:"1.5vw" }} src="../addArticles.png" />
                      <div class='Chakra-Petch'>
                        &nbsp;{article.name}
                      </div>
                    </Col>
                    <Col span={7} style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ width:"1.5vw" }} src="../user-interface.png" />
                      <div class='Chakra-Petch'>
                        &nbsp;{article?.articleFolder?.userName}
                      </div>
                    </Col>
                    <Col span={7} style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ width:"1.5vw" }} src="../clock.png" /> 
                      <div class='Chakra-Petch'>
                        &nbsp;{article?.updateTime?.substr(0, 10)}
                      </div>
                    </Col>
                  </Row>
                </Header>
              </div>
              <Content  style={{ minHeight: "90%", minWidth: "100%", paddingTop: "0vh"}}>
                <div className="container" style={{ display: "inline" }}  data-color-mode="light">
                  <MDEditor
                    style={{ minHeight: "100%", borderRadius: "0 0 10px 10px" }}
                    value={article?.content}
                    preview="preview"
                    hideToolbar={true}
                  />
                </div>
              </Content>
            </Layout>
          </div>
        </Col>
        <Col style={{backgroundColor: "white", borderRadius: "1vw 0vw 0vw 1vw"}} span={3}/>
      </Row>
      
    </>
  );
}