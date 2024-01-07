import React, { useEffect, useState } from "react";
import { Input, Layout, Menu, Modal, Button, message, Col, Row } from "antd";
import "@fontsource/caveat";
import * as myArticle from "../api/myArticle";

const { Sider } = Layout;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
}

const AddFolder = (prop) => {
  const handleOk = async () => {
    const folderName = document.getElementById("folderName").value;
    if (folderName) {
      prop.setIsModalOpen(false);
      await myArticle.addFolder(folderName);
      document.location.reload();
    } else {
      message.error('folder name is empty', 3);
    }
  };

  const handleCancel = () => {
    prop.setIsModalOpen(false);
  };
  return (
    <>
      <Modal open={prop.isModalOpen} onCancel={handleCancel} footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}>
        <p>Folder Name</p>
          <Input id="folderName" />
      </Modal>
    </>
  );
}

const DelFolder = (props) => {
  const handleYes = async () => {
    myArticle.delFolder(props.delModalProps.id);
    console.log(props)
    document.location.reload();
  };

  const handleNo = () => {
    props.setIsModalOpen(false);
  };
  return (
    <>
      <Modal open={props.isModalOpen} onCancel={handleNo} footer={[
          <Button key="No" onClick={handleNo}>
            No
          </Button>,
          <Button key="Yes" type="primary" onClick={handleYes}>
            Yes
          </Button>,
        ]}>
        <p>Do you want to delete the folder?</p>
      </Modal>
    </>
  );
}

const AddArticle = (props) => {
  const handleSave = async () => {
    const articleName = document.getElementById("articleName").value;
    if (articleName) {
      props.setIsModalOpen(false);
      await myArticle.addArticle(props.addArticleModalProps.id, articleName);
      document.location.reload();
    } else {
      message.error('article name is empty', 3);
    }
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  return (
    <>
      <Modal open={props.isModalOpen} onCancel={handleCancel} footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}>
        <p>Folder Name</p>
          <Input id="articleName" />
      </Modal>
    </>
  );
}

const getSideBarItems = (setSideBarItems, setIsAddfolderModalOpen, setIsDelfolderModalOpen, setDelModalProps, setIsAddArticleModalOpen, setAddArticleModalProps) => {

  const handleMouseEnter = () => {
    // 在這裡執行 hover 開始時的操作
    console.log("hi");
  };

  const handleMouseLeave = () => {
    // 在這裡執行 hover 結束時的操作
  };

  myArticle.getFolder().then(
    (folderList) => {
      setSideBarItems(
        () => {
          let sideBarItems = [];
          sideBarItems.push(getItem(<a onClick={()=>{setIsAddfolderModalOpen(true);}} style={{ fontWeight: "bold", fontSize: "1vw"}}></a>, "folder_0", <img src="./add.png" alt="" style={{width: "1vw", left: "40%", position: "relative"}}/>))
          folderList.map((folder)=>{

            // 文章
            const articleItems = []
            folder.articles.map((article) => {
              articleItems.push(getItem(article.name, 'aritcle_' + article.id));
            });

            // 資料夾
            sideBarItems.push(getItem(
              <div>
                <Row>
                  <Col span={16} style={{ justifyContent: "center", alignItems: "center" }}>
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{folder.name}</div>
                  </Col>
                  <Col span={4}>
                    <img style={{width: "1vw"}} onClick={()=> {
                      setAddArticleModalProps({ id: folder.id });
                      setIsAddArticleModalOpen(true);
                      }} src="./add2.png" alt="" />
                  </Col>
                  <Col span={4}>
                    <img style={{width: "1vw"}} onClick={()=> {
                      setDelModalProps({ id: folder.id });
                      setIsDelfolderModalOpen(true);
                      }} src="./delete.png" alt="" />
                  </Col>
                </Row>
              </div>,
              folder.id,
              <div style={{width: "1vw"}} />, 
              articleItems
            ));
          })
          return sideBarItems;
        }
      )
    }
  );
}

export default function MyArticles() {
  const [collapsed, setCollapsed] = useState(false);
  const [isAddfolderModalOpen, setIsAddfolderModalOpen] = useState(false);
  const [isDelfolderModalOpen, setIsDelfolderModalOpen] = useState(false);
  const [isAddArticleModalOpen, setIsAddArticleModalOpen] = useState(false);
  const [sideBarItems, setSideBarItems] = useState([]);
  const [delModalProps, setDelModalProps] = useState({ id: 0 });
  const [addArticleModalProps, setAddArticleModalProps] = useState({ id: 0 });
  useEffect(() => {
    getSideBarItems(setSideBarItems, setIsAddfolderModalOpen, setIsDelfolderModalOpen, setDelModalProps, setIsAddArticleModalOpen, setAddArticleModalProps);
  },[]);

  return (
    <Layout style={{ height: "92vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          defaultOpenKeys={["32"]}
          mode="inline"
          items={sideBarItems}
        />
        <AddFolder isModalOpen={isAddfolderModalOpen} setIsModalOpen={setIsAddfolderModalOpen} />
        <DelFolder isModalOpen={isDelfolderModalOpen} setIsModalOpen={setIsDelfolderModalOpen} delModalProps={delModalProps} />
        <AddArticle isModalOpen={isAddArticleModalOpen} setIsModalOpen={setIsAddArticleModalOpen} addArticleModalProps={addArticleModalProps} />
      </Sider>
    </Layout>
  );
}
