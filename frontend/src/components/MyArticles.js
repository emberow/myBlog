import React, { useEffect, useState, useContext } from "react";
import { Input, Layout, Menu, Modal, Button, message, Col, Row } from "antd";
import "@fontsource/caveat";
import * as myArticle from "../api/myArticle.js";
import "./MyArticleStyle.css";
import { Content, Header } from "antd/es/layout/layout.js";
import MDEditor, { EditorContext }  from '@uiw/react-md-editor';

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
    document.location.reload();
  };

  const handleNo = () => {
    props.setDelFolderModalProps({ isModalOpen: false });
  };
  return (
    <>
      <Modal open={props.delModalProps.isModalOpen} onCancel={handleNo} footer={[
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
      await myArticle.addArticle(props.addArticleModalProps.id, articleName);
      props.setAddArticleModalProps({ isModalOpen: false })
      document.location.reload();
    } else {
      message.error('article name is empty', 3);
    }
  };

  const handleCancel = () => {
    props.setAddArticleModalProps({ isModalOpen: false })
  };
  return (
    <>
      <Modal open={props.addArticleModalProps.isModalOpen} onCancel={handleCancel} footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}>
        <p>Article Name</p>
          <Input id="articleName" />
      </Modal>
    </>
  );
}

const getSideBarItems = (setSideBarItems, setIsAddfolderModalOpen, setDelModalProps, setAddArticleModalProps) => {

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
                    <div>{folder.name} </div>
                  </Col>
                  <Col span={4}>
                    <img className="icon" style={{width: "1vw"}} onClick={()=> {
                      setAddArticleModalProps({ id: folder.id, isModalOpen: true });
                      }} src="./add2.png" alt="" />
                  </Col>
                  <Col span={4}>
                    <img className="icon" style={{width: "1vw"}} onClick={()=> {
                      setDelModalProps({ id: folder.id, isModalOpen: true });
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

const PreviewButton = () => {
  const { preview, dispatch } = useContext(EditorContext);
  const click = () => {
    dispatch({
      preview: preview === "edit" ? "preview" : "edit"
    });
  };
  // if (preview === "edit") {
  //   return (
  //     <svg width="12" height="12" viewBox="0 0 520 520" onClick={click}>
  //       <polygon
  //         fill="currentColor"
  //         points="0 71.293 0 122 319 122 319 397 0 397 0 449.707 372 449.413 372 71.293"
  //       />
  //       <polygon
  //         fill="currentColor"
  //         points="429 71.293 520 71.293 520 122 481 123 481 396 520 396 520 449.707 429 449.413"
  //       />
  //     </svg>
  //   );
  // }
  return (
    <Button onClick={click}>preview</Button>
  );
};

// const codePreview = {
//   name: "preview",
//   keyCommand: "preview",
//   value: "preview",
//   icon: <Button2 />
// };

export default function MyArticles() {
  const [sideBarItems, setSideBarItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isAddfolderModalOpen, setIsAddfolderModalOpen] = useState(false);
  const [delFolderModalProps, setDelFolderModalProps] = useState({ id: 0, isModalOpen: false });
  const [addArticleModalProps, setAddArticleModalProps] = useState({ id: 0, isModalOpen: false });
  const [value, setValue] = React.useState("**Hello world!!!**");
  useEffect(() => {
    getSideBarItems(setSideBarItems, setIsAddfolderModalOpen, setDelFolderModalProps, setAddArticleModalProps);
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
        <DelFolder delModalProps={delFolderModalProps} setDelFolderModalProps={setDelFolderModalProps} />
        <AddArticle addArticleModalProps={addArticleModalProps} setAddArticleModalProps={setAddArticleModalProps} />
      </Sider>
      <Content>
        <Layout style={{ height: "92vh", margin:"0.5vw"}}>
          <Header style={{ background: "white" }}>
            <Button style={{ margin:"0.5vw"}}>publish</Button>
            <PreviewButton style={{ margin:"0.5vw"}}>preview</PreviewButton>
            <Button style={{ margin:"0.5vw"}}>save</Button>
            <Button style={{ margin:"0.5vw"}}>cancel</Button>
          </Header>
          <Content>
            <div className="container" data-color-mode="light">
              <MDEditor
                value={value}
                preview="edit"
                onChange={(val) => setValue(val)}
              />
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}
