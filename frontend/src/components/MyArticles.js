import React, { useEffect, useState, useRef } from "react";
import { Input, Layout, Menu, Modal, Button, message, Col, Row, ConfigProvider } from "antd";
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

const DelArticle = (props) => {
  const handleYes = async () => {
    myArticle.delArticle(props.delArticleProps.id);
    document.location.reload();
  };

  const handleNo = () => {
    props.setDelArticleProps({ isModalOpen: false });
  };
  return (
    <>
      <Modal open={props.delArticleProps.isModalOpen} onCancel={handleNo} footer={[
          <Button key="No" onClick={handleNo}>
            No
          </Button>,
          <Button key="Yes" type="primary" onClick={handleYes}>
            Yes
          </Button>,
        ]}>
        <p>Do you want to delete the article?</p>
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

const getSideBarItems = (setSideBarItems, setIsAddfolderModalOpen, setDelModalProps, setAddArticleModalProps, setArticle, setValue, setDelArticleProps, setIsEditMode, setTempContent) => {

  myArticle.getFolder().then(
    (folderList) => {
      setSideBarItems(
        () => {
          let sideBarItems = [];
          sideBarItems.push(getItem(<a onClick={()=>{setIsAddfolderModalOpen(true);}} style={{ fontWeight: "bold", fontSize: "1vw"}}></a>, "folder_0", <img src="./add.png" alt="" style={{width: "1vw", left: "40%", position: "relative"}}/>))
          folderList?.map((folder)=>{

            // 文章
            const articleItems = []
            folder?.articles?.map((article) => {
              articleItems.push(getItem(
                  <div onClick={async() => {
                    const tempArticle = await myArticle.getArticle(article.id)
                    setIsEditMode(false);
                    setArticle(tempArticle);
                    setValue(tempArticle?.content);
                    setTempContent(tempArticle?.content);
                  }}>
                    <Row>
                      <Col span={20}>
                        <div class='Chakra-Petch'>
                          {article.name}
                        </div>
                      </Col>
                      <Col span={4}>
                        <img className="articleIcon" style={{width: "0.8vw"}} src="./delete.png" alt="" onClick={()=> {
                          setDelArticleProps({ id: article.id, isModalOpen: true });
                        }}/>
                      </Col>
                    </Row>
                  </div>,
                  'aritcle_' + article.id
              ));
            });

            // 資料夾
            sideBarItems.push(getItem(
              <div>
                <Row>
                  <Col span={16}>
                    <div class='Chakra-Petch'>
                      {folder.name} 
                    </div>
                  </Col>
                  <Col span={4}>
                    <img className="icon" style={{width: "0.8vw"}} onClick={()=> {
                      setAddArticleModalProps({ id: folder.id, isModalOpen: true });
                      }} src="./add2.png" alt="" />
                  </Col>
                  <Col span={4}>
                    <img className="icon" style={{width: "0.8vw"}} onClick={()=> {
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

const PreviewButton = (props) => {
  let dispatch;
  let preview;
  let editorInstance;

  const click = () => {
    editorInstance = props.editorRef.current;
    if (editorInstance) {
      dispatch = editorInstance.dispatch;
      preview = editorInstance.preview;
    }
    dispatch({
      preview: props.isPreview ? "edit" : "preview"
    });
    props.setIsPreview(!props.isPreview);
  };
  return (
    <Button style={{ paddingLeft: "0.5vw", paddingRight: "0.5vw", display: props.isEditMode ? "inline" : "None", width:"6vw"}} onClick={click}>{props.isPreview ? "edit" : "preview"}</Button>
  );
};

const saveButton = async (setIsEditMode, id, content) => {
  const article = {
    "id": id,
    "content": content,
  }
  myArticle.patchArticle(article);
  setIsEditMode(false);
  await message.success('save article successed', 1);
}


export default function MyArticles() {
  const [sideBarItems, setSideBarItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isAddfolderModalOpen, setIsAddfolderModalOpen] = useState(false);
  const [delFolderModalProps, setDelFolderModalProps] = useState({ id: 0, isModalOpen: false });
  const [addArticleModalProps, setAddArticleModalProps] = useState({ id: 0, isModalOpen: false });
  const [value, setValue] = React.useState("**Hello world!!!**");
  const editorRef = useRef();
  const [isEditMode, setIsEditMode] = useState(false);
  const [delArticleProps, setDelArticleProps] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [tempContent, setTempContent] = useState("");
  
  const [article, setArticle] = useState({
    "id": null,
    "name": null,
    "content": "",
    "updateTime": null,
    "isPublish": null,
    "articleFolder": {
      "id": null,
      "name": null,
      "userName": null,
      "updateTime": null,
    },
  });
  
  useEffect(() => {
    getSideBarItems(setSideBarItems, setIsAddfolderModalOpen, setDelFolderModalProps, setAddArticleModalProps, setArticle, setValue, setDelArticleProps, setIsEditMode, setTempContent);
  },[]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log(isEditMode);
      if (isEditMode && tempContent != article?.content) {
        const message = 'Changes you made may not be saved.';
        event.returnValue = message;
        return message;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  },[tempContent, isEditMode]);

  return (
    <Layout style={{ minHeight: "100%", minWidth: "100%", paddingTop: "0.5vh"}}>
      <Sider
        style={{borderRadius: "10px 10px 10px 10px"}}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              subMenuItemBg: "rgba(0, 0, 0, 0.03)"
            },
          },
        }}
      >
        <Menu
          style={{borderRadius: "10px 10px 10px 10px"}}
          defaultOpenKeys={["32"]}
          mode="inline"
          items={sideBarItems}
        />
      </ConfigProvider>
        <AddFolder isModalOpen={isAddfolderModalOpen} setIsModalOpen={setIsAddfolderModalOpen} />
        <DelFolder delModalProps={delFolderModalProps} setDelFolderModalProps={setDelFolderModalProps} />
        <DelArticle delArticleProps={delArticleProps} setDelArticleProps={setDelArticleProps} />
        <AddArticle addArticleModalProps={addArticleModalProps} setAddArticleModalProps={setAddArticleModalProps} />
      </Sider>
      <Content style={{ paddingLeft: "0.5vh" }}>
        <div style={{display: (article.id != null) ? "None" : "grid", background: "white", height: "100%", width: "100%", borderRadius: "10px 0 0 0", placeItems: "center" }}>
          <img src="./box.png" alt="" style={{ width: "20vw", opacity: 0.05 }} />
        </div>
        <Layout style={{ display: (article.id != null) ? "inline" : "None", height: "100%", gridTemplateRows: "10% 90%"}}>
          <Header style={{ background: "white", borderRadius: "10px 0 0 0" }}>
            <Row>
              <Col span={5} style={{ display: "flex", alignItems: "center" }}>
                <img style={{ width:"1.5vw" }} src="../addArticles.png" />
                <div class='Chakra-Petch'>
                  &nbsp; {article.name}
                </div>
              </Col>
              <Col span={5} style={{ display: "flex", alignItems: "center" }}>
                <img style={{ width:"1.5vw" }} src="../user-interface.png" />
                <div class='Chakra-Petch'>
                  &nbsp;{article.articleFolder.userName}
                </div>
              </Col>
              <Col span={5} style={{ display: "flex", alignItems: "center" }}>
                <img style={{ width:"1.5vw" }} src="../clock.png" /> 
                <div class='Chakra-Petch'>
                  &nbsp;{article?.updateTime?.substr(0, 10)}
                </div>
              </Col>
              <Col span={3} />
              <Col span={2}>
                <PreviewButton style={{ paddingLeft: "0.5vw", paddingRight: "0.5vw", display: isEditMode ? "inline" : "None", width:"6vw" }} editorRef={editorRef} isEditMode={isEditMode} isPreview={isPreview} setIsPreview={setIsPreview} />
              </Col>
              <Col span={2}>
                <Button style={{ paddingLeft: "0.5vw", paddingRight: "0.5vw" , display: isEditMode ? "None" : "inline", width:"6vw"}} onClick={async ()=>{
                  try {
                    await myArticle.patchArticle({id: article.id, isPublish: (article.isPublish) ? false : true});
                    setArticle({...article, isPublish: (article.isPublish) ? false : true});
                    (article.isPublish) ? await message.success('unpublish successed', 1) : await message.success('publish successed', 1);
                  } catch (error) {
                    (article.isPublish) ? await message.error('unpublish failed', 1) : await message.error('publish failed', 1);
                  }
                  }}>{(article.isPublish) ? "unpublish": "publish"}</Button>
                <Button style={{ paddingLeft: "0.5vw", paddingRight: "0.5vw", display: isEditMode ? "inline" : "None", width:"6vw"}} onClick={()=>{saveButton(setIsEditMode, article.id, value)}}>save</Button>
              </Col>
              <Col span={2}>
                <Button style={{ paddingLeft: "0.5vw", paddingRight: "0.5vw", display: isEditMode ? "None" : "inline" , width:"6vw" }} onClick={()=>{
                  setIsEditMode(true);
                  setIsPreview(false); 
                  const editorInstance = editorRef.current;
                  if (editorInstance) {
                    const dispatch = editorInstance.dispatch;
                    dispatch({
                      preview: "edit"
                    });
                  }
                  setTempContent(article?.content);
                  }}>
                    <div class='Chakra-Petch'>
                      edit
                    </div>
                  </Button>
                <Button style={{ paddingLeft: "0.5vw", paddingRight: "0.5vw", display: isEditMode ? "inline" : "None", width:"6vw"}} onClick={async()=>{
                  setIsEditMode(false)
                  const tempArticle = await myArticle.getArticle(article.id)
                  setArticle(tempArticle);
                  setValue(tempArticle?.content);
                  setTempContent(tempArticle?.content);
                }}>
                  <div class='Chakra-Petch'>
                    cancel
                  </div>
                </Button>
              </Col>
            </Row>
          </Header>
          <Content style={{ height: "90%" }} >
            <div className="container" style={{ display: isEditMode ? "None" : "inline" }}  data-color-mode="light">
              <MDEditor
                style={{ minHeight: "100%", borderRadius: "0 0 0 10px" }}
                value={value}
                preview="preview"
                hideToolbar={true}
              />
            </div>
            <div className="container" style={{ display: isEditMode ? "inline" : "None" }}  data-color-mode="light">
              <MDEditor
                style={{ minHeight: "100%", borderRadius: "0 0 0 10px"}}
                ref={editorRef}
                value={value}
                preview="edit"
                onChange={(val) => {
                  setValue(val);
                  setTempContent(val);
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
