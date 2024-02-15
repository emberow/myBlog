import { Col, Row } from "antd";
import './articles.css';
import React, { useEffect, useState } from "react";
import { getArticleList } from "../api/articles.js";

const initArticleList = async(page, setArticleList) => {
  const result = await getArticleList(page);
  setArticleList(result);
}

export default function Articles() {
  const [page, setPage] = useState(1);
  const [articleList, setArticleList] = useState({});

  useEffect(() => {
    initArticleList(1, setArticleList);
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
                  <Row style={{paddingLeft: "2vh"}}>
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
                <div className="truncatedText" style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                  {articleList[0]?.content}
                </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                <div style={{ padding: "1vh" }}>
                  <Row style={{paddingLeft: "2vh"}}>
                    <Col span={12}>
                      <b>{articleList[1]?.name}</b>
                    </Col>
                    <Col span={6}>
                      author: {articleList[1]?.articleFolder.userName}
                    </Col>
                    <Col span={6}>
                      date: {articleList[1]?.updateTime?.substr(0, 10)}
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                    {articleList[1]?.content}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                <div style={{ padding: "1vh" }}>
                  <Row style={{paddingLeft: "2vh"}}>
                    <Col span={12}>
                      <b>{articleList[2]?.name}</b>
                    </Col>
                    <Col span={6}>
                      author: {articleList[2]?.articleFolder.userName}
                    </Col>
                    <Col span={6}>
                      date: {articleList[2]?.updateTime?.substr(0, 10)}
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                    {articleList[2]?.content}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                <div style={{ padding: "1vh" }}>
                  <Row style={{paddingLeft: "2vh"}}>
                    <Col span={12}>
                      <b>{articleList[3]?.name}</b>
                    </Col>
                    <Col span={6}>
                      author: {articleList[3]?.articleFolder.userName}
                    </Col>
                    <Col span={6}>
                      date: {articleList[3]?.updateTime?.substr(0, 10)}
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                    {articleList[3]?.content}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                <div style={{ padding: "1vh" }}>
                  <Row style={{paddingLeft: "2vh"}}>
                    <Col span={12}>
                      <b>{articleList[4]?.name}</b>
                    </Col>
                    <Col span={6}>
                      author: {articleList[4]?.articleFolder.userName}
                    </Col>
                    <Col span={6}>
                      date: {articleList[4]?.updateTime?.substr(0, 10)}
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                    {articleList[4]?.content}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0.5vh 0.5vh", borderRadius: "0vw 0vw 1vw 1vw"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                <div style={{ padding: "1vh" }}>
                  <Row style={{paddingLeft: "2vh"}}>
                    <Col span={12}>
                      <b>{articleList[5]?.name}</b>
                    </Col>
                    <Col span={6}>
                      author: {articleList[5]?.articleFolder.userName}
                    </Col>
                    <Col span={6}>
                      date: {articleList[5]?.updateTime?.substr(0, 10)}
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                    {articleList[5]?.content}
                  </div>
                </div>
              </div>
            </div>
            <Row style={{ height: "9.2vh", backgroundColor: "rgb(245, 245, 245)", padding:"0 0.5vh 0 0.5vh" }}>
              <Col span={9} style={{backgroundColor: "white", borderRadius: "1vw 0 0 1vw"}} />
              <Col className="pageChange" span={2} style={{backgroundColor: "white"}}>
                <div style={{ height: "5vh", paddingTop: "2vh", textAlign: "center"}}>
                  <img src="./left-arrow.png" style={{ width: "2vw", opacity: (page == 1) ? 0.3 : 1 }} onClick={() => {
                    if ((page - 1) > 0) {
                      initArticleList(page - 1, setArticleList);
                      setPage(page - 1);
                    }
                  }}/>
                </div>
              </Col>
              <Col span={2} style={{backgroundColor: "white"}}>
                <div style={{ paddingTop: "2vh", textAlign: "center", fontSize: "1.5vw" }}>{page}</div>
              </Col>
              <Col className="pageChange" span={2} style={{backgroundColor: "white"}}>
                <div style={{ height: "5vh", paddingTop: "2vh", textAlign: "center"}}>
                  <img src="./right-arrow.png" style={{ width: "2vw", opacity: (Math.floor((articleList?.maximumPages - (articleList?.maximumPages % 6)) / 6) + 1 + ((articleList?.maximumPages % 6 == 0) ? -1 : 0) == page) ? 0.3 : 1 }} onClick={() => {
                    if (Math.floor((articleList?.maximumPages - (articleList?.maximumPages % 6)) / 6) + 1 + ((articleList?.maximumPages % 6 == 0) ? -1 : 0) != page) {
                      console.log(articleList?.maximumPages, articleList?.maximumPages % 6)
                      initArticleList(page + 1, setArticleList);
                      setPage(page + 1);
                    }
                  }}/>
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