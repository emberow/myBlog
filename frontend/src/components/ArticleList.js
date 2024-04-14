import { Col, Row } from "antd";
import './articleList.css';
import React, { useEffect, useState } from "react";
import { getArticleList } from "../api/articles.js";

const initArticleList = async(page, setArticleList, search) => {
  const result = await getArticleList(page, search);
  setArticleList(result);
}

export default function Articles() {
  const [page, setPage] = useState(1);
  const [articleList, setArticleList] = useState({maximumPages: 0});
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const search = params.get('search');

  useEffect(() => {
    initArticleList(1, setArticleList, search);
  },[]);

  return (
    <Row style={{ padding: "0.5vh" }}>
      <Col style={{backgroundColor: "white", borderRadius: "0vw 1vw 1vw 0vw"}} span={5}/>
      <Col span={14} >
        <div style={{backgroundColor: "rgb(245, 245, 245)"}}>
          <div style={{ minHeight:"100%" }}>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0vh 0.5vh 0 0.5vh", borderRadius: "1vw 1vw 0vw 0vw"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor:(articleList[0]?.id) ? "pointer" : "default"}} onClick={()=>{
                if (articleList[0]?.id) {
                  window.location.href = "/article/" + articleList[0]?.id;
                }
              }}>
                <div style={{ padding: "1vh" }}>
                  <Row style={{paddingLeft: "2vh", display: articleList[0]?.name? "flex" : "none" }}>
                    <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ width:"1.2vw" }} src="../addArticles.png" />
                      <div className='Chakra-Petch'>
                        &nbsp;{articleList[0]?.name}
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[0]?.articleFolder.userName) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../user-interface.png" />
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[0]?.articleFolder.userName}
                        </div>
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[0]?.updateTime) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../clock.png" /> 
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[0]?.updateTime?.substr(0, 10)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                <div className="truncatedText" style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                  <div className='Chakra-Petch'>
                    {articleList[0]?.content}
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor:(articleList[1]?.id) ? "pointer" : "default"}} onClick={()=>{
                if (articleList[1]?.id) {
                  window.location.href = "/article/" + articleList[1]?.id;
                }
              }}> 
                <div style={{ padding: "1vh" }}>
                  <Row style={{paddingLeft: "2vh", display: articleList[1]?.name? "flex" : "none" }}>
                    <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ width:"1.2vw" }} src="../addArticles.png" />
                      <div className='Chakra-Petch'>
                        &nbsp; {articleList[1]?.name}
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[1]?.articleFolder.userName) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../user-interface.png" />
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[1]?.articleFolder.userName}
                        </div>
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[1]?.updateTime) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../clock.png" /> 
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[1]?.updateTime?.substr(0, 10)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                    <div className='Chakra-Petch'>
                      {articleList[1]?.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor:(articleList[2]?.id) ? "pointer" : "default"}} onClick={()=>{
                if (articleList[2]?.id) {
                  window.location.href = "/article/" + articleList[2]?.id;
                }
              }}> 
                <div style={{ padding: "1vh" }}>
                  <Row style={{paddingLeft: "2vh", display: articleList[2]?.name? "flex" : "none" }}>
                    <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ width:"1.2vw" }} src="../addArticles.png" />
                      <div className='Chakra-Petch'>
                        &nbsp; {articleList[2]?.name}
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[2]?.articleFolder.userName) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../user-interface.png" />
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[2]?.articleFolder.userName}
                        </div>
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[2]?.updateTime) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../clock.png" /> 
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[2]?.updateTime?.substr(0, 10)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                    <div className='Chakra-Petch'>
                      {articleList[2]?.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor:(articleList[3]?.id) ? "pointer" : "default"}} onClick={()=>{
                if (articleList[3]?.id) {
                  window.location.href = "/article/" + articleList[3]?.id;
                }
              }}> 
                <div style={{ padding: "1vh" }}>
                  <Row style={{paddingLeft: "2vh", display: articleList[3]?.name? "flex" : "none" }}>
                    <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ width:"1.2vw" }} src="../addArticles.png" />
                      <div className='Chakra-Petch'>
                        &nbsp; {articleList[3]?.name}
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[3]?.articleFolder.userName) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../user-interface.png" />
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[3]?.articleFolder.userName}
                        </div>
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[3]?.updateTime) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../clock.png" /> 
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[3]?.updateTime?.substr(0, 10)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                    <div className='Chakra-Petch'>
                      {articleList[3]?.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor:(articleList[4]?.id) ? "pointer" : "default"}} onClick={()=>{
                if (articleList[4]?.id) {
                  window.location.href = "/article/" + articleList[4]?.id;
                }
              }}> 
                <div style={{ padding: "1vh" }}>
                  <Row style={{paddingLeft: "2vh", display: articleList[4]?.name? "flex" : "none" }}>
                    <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ width:"1.2vw" }} src="../addArticles.png" />
                      <div className='Chakra-Petch'>
                        &nbsp; {articleList[4]?.name}
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[4]?.articleFolder.userName) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../user-interface.png" />
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[4]?.articleFolder.userName}
                        </div>
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[4]?.updateTime) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../clock.png" /> 
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[4]?.updateTime?.substr(0, 10)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                    <div className='Chakra-Petch'>
                      {articleList[4]?.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0.5vh 0.5vh", borderRadius: "0vw 0vw 1vw 1vw"}}>
              <div className="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor:(articleList[5]?.id) ? "pointer" : "default"}} onClick={()=>{
                if (articleList[5]?.id) {
                  window.location.href = "/article/" + articleList[5]?.id;
                }
              }}> 
                <div style={{ padding: "1vh" }}>
                  <Row style={{paddingLeft: "2vh", display: articleList[5]?.name? "flex" : "none" }}>
                    <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                      <img style={{ width:"1.2vw" }} src="../addArticles.png" />
                      <div className='Chakra-Petch'>
                        &nbsp; {articleList[5]?.name}
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[5]?.articleFolder.userName) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../user-interface.png" />
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[5]?.articleFolder.userName}
                        </div>
                      </div>
                    </Col>
                    <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{display: (articleList[5]?.updateTime) ? "flex": "none"}}>
                        <img style={{ width:"1.2vw" }} src="../clock.png" /> 
                        <div className='Chakra-Petch'>
                          &nbsp;{articleList[5]?.updateTime?.substr(0, 10)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div style={{ width: "55vw", overflow: "hidden", padding: "2vh 2vh 0 2vh" }}>
                    <div className='Chakra-Petch'>
                      {articleList[5]?.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Row style={{ height: "9.2vh", backgroundColor: "rgb(245, 245, 245)", padding:"0 0.5vh 0 0.5vh" }}>
              <Col span={9} style={{backgroundColor: "white", borderRadius: "1vw 0 0 1vw"}} />
              <Col className="pageChange" span={2} style={{backgroundColor: "white"}}>
                <div style={{ height: "5vh", paddingTop: "2vh", textAlign: "center"}}>
                  <img src="../left-arrow.png" style={{ width: "2vw", opacity: (page == 1) ? 0.3 : 1 }} onClick={() => {
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
                  <img src="../right-arrow.png" style={{ width: "2vw", opacity: (articleList?.maximumPages / 6 > page) ? 1 : 0.3 }} onClick={() => {
                    if (articleList?.maximumPages / 6 > page) {
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