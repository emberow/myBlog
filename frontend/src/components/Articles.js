import { Col, Row } from "antd";
import './articles.css';
import React, { useEffect, useState } from "react";
import { getArticleList } from "../api/articles.js";

const initArticleList = async(setArticleList) => {
  const result = await getArticleList();
  setArticleList(result);
}

export default function Articles() {
  const [page, setPage] = useState(1);
  const [articleList, setArticleList] = useState({});

  useEffect(() => {
    initArticleList(setArticleList);
  },[]);

  return (
    <Row style={{ padding: "0.5vh" }}>
      <Col style={{backgroundColor: "white", borderRadius: "0vw 1vw 1vw 0vw"}} span={5}/>
      <Col span={14} >
        <div style={{backgroundColor: "rgb(245, 245, 245)"}}>
          <div style={{ minHeight:"100%" }}>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0vh 0.5vh 0 0.5vh", borderRadius: "1vw 1vw 0vw 0vw"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                <div style={{ padding: "1vh" }}>
                  <Row>
                    <Col span={12}>
                      <b>{articleList[0]?.name}</b>
                    </Col>
                    <Col span={6}>
                      author: {articleList[0]?.articleFolder.userName}
                    </Col>
                    <Col span={6}>
                      date: {articleList[0]?.updateTime?.substr(0, 10)}
                    </Col>
                  </Row>
                <div style={{ width: "55vw", overflow: "hidden" }}>
                  {articleList[0]?.content}
                </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                <div style={{ padding: "1vh" }}>
                  <Row>
                    <Col span={12}>
                      <b>{articleList[0]?.name}</b>
                    </Col>
                    <Col span={6}>
                      author: {articleList[0]?.articleFolder.userName}
                    </Col>
                    <Col span={6}>
                      date: {articleList[0]?.updateTime?.substr(0, 10)}
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden" }}>
                    {articleList[0]?.content}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                <div style={{ padding: "1vh" }}>
                  <Row>
                    <Col span={12}>
                      <b>{articleList[0]?.name}</b>
                    </Col>
                    <Col span={6}>
                      author: {articleList[0]?.articleFolder.userName}
                    </Col>
                    <Col span={6}>
                      date: {articleList[0]?.updateTime?.substr(0, 10)}
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden" }}>
                    {articleList[0]?.content}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                <div style={{ padding: "1vh" }}>
                  <Row>
                    <Col span={12}>
                      <b>{articleList[0]?.name}</b>
                    </Col>
                    <Col span={6}>
                      author: {articleList[0]?.articleFolder.userName}
                    </Col>
                    <Col span={6}>
                      date: {articleList[0]?.updateTime?.substr(0, 10)}
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden" }}>
                    {articleList[0]?.content}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                <div style={{ padding: "1vh" }}>
                  <Row>
                    <Col span={12}>
                      <b>{articleList[0]?.name}</b>
                    </Col>
                    <Col span={6}>
                      author: {articleList[0]?.articleFolder.userName}
                    </Col>
                    <Col span={6}>
                      date: {articleList[0]?.updateTime?.substr(0, 10)}
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden" }}>
                    {articleList[0]?.content}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0.5vh 0.5vh", borderRadius: "0vw 0vw 1vw 1vw"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                <div style={{ padding: "1vh" }}>
                  <Row>
                    <Col span={12}>
                      <b>{articleList[0]?.name}</b>
                    </Col>
                    <Col span={6}>
                      author: {articleList[0]?.articleFolder.userName}
                    </Col>
                    <Col span={6}>
                      date: {articleList[0]?.updateTime?.substr(0, 10)}
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden" }}>
                    {articleList[0]?.content}
                  </div>
                </div>
              </div>
            </div>
            <Row style={{ height: "9.2vh", backgroundColor: "rgb(245, 245, 245)", padding:"0 0.5vh 0 0.5vh" }}>
              <Col span={9} style={{backgroundColor: "white", borderRadius: "1vw 0 0 1vw"}} />
              <Col span={2} style={{backgroundColor: "white"}}>
                <div style={{ height: "5vh", paddingTop: "2vh", textAlign: "center"}}>
                  <img src="./left-arrow.png" style={{ width: "2vw" }}/>
                </div>
              </Col>
              <Col span={2} style={{backgroundColor: "white"}}>
                <div style={{ paddingTop: "2vh", textAlign: "center", fontSize: "1.5vw" }}>1</div>
              </Col>
              <Col span={2} style={{backgroundColor: "white"}}>
                <div style={{ height: "5vh", paddingTop: "2vh", textAlign: "center"}}>
                  <img src="./right-arrow.png" style={{ width: "2vw" }}/>
                </div>
              </Col>
              <Col span={9} style={{backgroundColor: "white", borderRadius: "0 1vw 1vw 0"}} />
            </Row>
          </div>
        </div>
      </Col>
      <Col style={{backgroundColor: "white", borderRadius: "1vw 0vw 0vw 1vw"}} span={5}/>
    </Row>
  );
}