import React, { useEffect, useState, useRef } from "react";
import { Input, Layout, Menu, Modal, Button, message, Col, Row } from "antd";
import "@fontsource/caveat";
import * as myArticle from "../api/myArticle.js";
import "./MyArticleStyle.css";
import { Content, Header } from "antd/es/layout/layout.js";
import MDEditor, { EditorContext, commands }  from '@uiw/react-md-editor';

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
      try {
        await myArticle.addFolder(folderName);
        document.location.reload();
      } catch {
        localStorage.removeItem('accessToken');
        await message.error('authentication failed', 1);
        window.location.href = "/login";
      }
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
    try {
      myArticle.delFolder(props.delModalProps.id);
      document.location.reload();
    } catch {
      localStorage.removeItem('accessToken');
      await message.error('authentication failed', 1);
      window.location.href = "/login";
    }
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
      try {
        await myArticle.addArticle(props.addArticleModalProps.id, articleName);
        props.setAddArticleModalProps({ isModalOpen: false })
        document.location.reload();
      } catch {
        localStorage.removeItem('accessToken');
        await message.error('authentication failed', 1);
        window.location.href = "/login";
      }
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

const getSideBarItems = (setSideBarItems, setIsAddfolderModalOpen, setDelModalProps, setAddArticleModalProps, setArticle) => {

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
              articleItems.push(getItem(<div onClick={async() => {
                setArticle(await myArticle.getArticle(article.id));
              }}>{article.name}</div>, 'aritcle_' + article.id));
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
  ).catch(async ()=> {
    localStorage.removeItem('accessToken');
    await message.error('authentication failed', 1);
    window.location.href = "/login";
  });
}

const PreviewButton = (props) => {
  let dispatch;
  let preview;
  let editorInstance;
  const [buttonValue, setButtonValue] = useState("preview");

  const click = () => {
    editorInstance = props.editorRef.current;
    if (editorInstance) {
      dispatch = editorInstance.dispatch;
      preview = editorInstance.preview;
    }
    setButtonValue(preview);
    dispatch({
      preview: preview === "edit" ? "preview" : "edit"
    });
  };
  return (
    <Button style={{ margin:"0.5vw", display: props.isEditMode ? "inline" : "None", width:"6vw"}} onClick={click}>{buttonValue}</Button>
  );
};


export default function MyArticles() {
  const [sideBarItems, setSideBarItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isAddfolderModalOpen, setIsAddfolderModalOpen] = useState(false);
  const [delFolderModalProps, setDelFolderModalProps] = useState({ id: 0, isModalOpen: false });
  const [addArticleModalProps, setAddArticleModalProps] = useState({ id: 0, isModalOpen: false });
  const [value, setValue] = React.useState("**Hello world!!!**");
  const editorRef = useRef();
  const [isEditMode, setIsEditMode] = useState(false);
  const [article, setArticle] = useState({
    "id": null,
    "name": null,
    "content": "",
    "updateTime": null,
    "isPublish": null
});
  
  useEffect(() => {
    getSideBarItems(setSideBarItems, setIsAddfolderModalOpen, setDelFolderModalProps, setAddArticleModalProps, setArticle);
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
        <Layout style={{ display: (article.id != null) ? "inline" : "None", height: "92vh"}}>
          <Header style={{ background: "white" }}>
            <Button style={{ margin:"0.5vw", display: isEditMode ? "None" : "inline", width:"6vw" }} onClick={()=>{myArticle.patchArticle({id: 12, isPublish: false})}}>publish</Button>
            <Button style={{ margin:"0.5vw", display: isEditMode ? "None" : "inline" , width:"6vw" }} onClick={()=>{setIsEditMode(true)}}>edit</Button>
            <PreviewButton style={{ margin:"0.5vw", display: isEditMode ? "inline" : "None", width:"6vw" }} editorRef={editorRef} isEditMode={isEditMode} />
            <Button style={{ margin:"0.5vw", display: isEditMode ? "inline" : "None", width:"6vw"}} onClick={()=>{setIsEditMode(false)}}>save</Button>
            <Button style={{ margin:"0.5vw", display: isEditMode ? "inline" : "None", width:"6vw"}} onClick={()=>{setIsEditMode(false)}}>cancel</Button>
          </Header>
          <Content>
            <div className="container" style={{ display: isEditMode ? "None" : "inline" }}  data-color-mode="light">
              <MDEditor
                value={article.content}
                preview="preview"
                hideToolbar={true}
              />
            </div>
            <div className="container" style={{ display: isEditMode ? "inline" : "None" }}  data-color-mode="light">
              <MDEditor
                ref={editorRef}
                value={article.content}
                preview="edit"
                onChange={(val) => {
                  let tempArticle = article;
                  tempArticle.content = val;
                  setValue(tempArticle);
                }}
                commands={[...commands.getCommands()]}
                extraCommands={[]}
              />
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}
