import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import "@fontsource/caveat";

const { Sider } = Layout;
const { Text } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const sideBarItems = [
  getItem("User", "folder_1", <img src="./addArticles.png" alt="" style={{width: "1vw"}}/>, [
    getItem("article 1", "folder_1_1"),
    getItem("article 2", "folder_1_2"),
    getItem("article 3", "folder_1_3"),
    getItem(<Text style={{ fontWeight: "bold", fontSize: "1vw"}}>Add Article</Text>, "folder_1_0", <img src="./add.png" alt="" style={{width: "1vw"}}/>)
  ]),
  getItem(<Text style={{ fontWeight: "bold", fontSize: "1vw"}}>Add Folder</Text>, "folder_0", <img src="./add.png" alt="" style={{width: "1vw"}}/>)
];

export default function MyArticles() {
  const [collapsed, setCollapsed] = useState(false);
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
      </Sider>
    </Layout>
  );
}
