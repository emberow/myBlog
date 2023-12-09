import React, { useEffect, useState } from "react";
import { Input, Layout, Menu, Typography, Modal, Button, message, Col, Row } from "antd";
import "@fontsource/caveat";
import * as myArticle from "../api/myArticle";

const { Sider } = Layout;
const { Text } = Typography;

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

const getSideBarItems = (setIsModalOpen, setSideBarItems) => {
  myArticle.getFolder().then(
    (folderList) => {
      setSideBarItems(
        () => {
          let sideBarItems = [];
          sideBarItems.push(getItem(<a onClick={()=>{setIsModalOpen(true);}} style={{ fontWeight: "bold", fontSize: "1vw"}}></a>, "folder_0", <img src="./add.png" alt="" style={{width: "1vw", left: "40%", position: "relative"}}/>))
          folderList.map((folder)=>{
            const articleItems = []
            folder.articles.map((article) => {
              articleItems.push(getItem(article.name, 'aritcle_' + article.id));
            });
            sideBarItems.push(getItem(
              <Row><Col span={20}>{folder.name}</Col></Row>,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sideBarItems, setSideBarItems] = useState([]);
  useEffect(() => {
    getSideBarItems(setIsModalOpen, setSideBarItems);
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
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sideBarItems}
        />
        <AddFolder isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Sider>
    </Layout>
  );
}
