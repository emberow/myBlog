import { Col, Row } from "antd";
import './articles.css';

export default function Articles() {
    return (
      <Row style={{ padding: "0.5vh" }}>
        <Col style={{backgroundColor: "white", borderRadius: "0vw 1vw 1vw 0vw"}} span={5}/>
        <Col span={14} >
          <div style={{backgroundColor: "rgb(245, 245, 245)"}}>
            <div style={{ minHeight:"100%" }}>
              <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0vh 0.5vh 0 0.5vh", borderRadius: "1vw 1vw 0vw 0vw"}}>
                <div class="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw"}}>
                  1234
                </div>
              </div>
              <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
                <div class="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw"}}>
                  1234
                </div>
              </div>
              <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
                <div class="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw"}}>
                  1234
                </div>
              </div>
              <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
                <div class="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw"}}>
                  1234
                </div>
              </div>
              <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0 0.5vh"}}>
                <div class="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw"}}>
                  1234
                </div>
              </div>
              <div style={{ backgroundColor: "rgb(245, 245, 245)", height: "13.5vh", padding: "0.5vh 0.5vh 0.5vh 0.5vh", borderRadius: "0vw 0vw 1vw 1vw"}}>
                <div class="article" style={{ height: "100%", paddingTop: "0.5vh", paddingRight: "1vh", paddingLeft: "1vh", borderRadius: "1vw"}}>
                  1234
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