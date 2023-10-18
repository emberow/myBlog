import React, { useState } from "react";
import { Input, Layout, Menu, Typography, Modal, Button, message } from "antd";
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

  const handleOk = () => {
    const folderName = document.getElementById("folderName").value;
    if (folderName) {
      prop.setIsModalOpen(false);
      myArticle.userAddFolder(folderName);
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

const sideBarItems = [
  getItem("User", "folder_1", <img src="./addArticles.png" alt="" style={{width: "1vw"}}/>, [
    getItem("article 1", "folder_1_1"),
    getItem("article 2", "folder_1_2"),
    getItem("article 3", "folder_1_3"),
    getItem(<Text style={{ fontWeight: "bold", fontSize: "1vw"}}>Add Article</Text>, "folder_1_0", <img src="./add.png" alt="" style={{width: "1vw"}}/>)
  ]),
  getItem("Add Folder", "folder_0", <img src="./add.png" alt="" style={{width: "1vw"}}/>)
];

export default function MyArticles() {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          onClick={({ key }) => {
            if (key.includes('folder_0')) {
              setIsModalOpen(true);
            }
          }}
        />
        <AddFolder isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Sider>
    </Layout>
  );
}
