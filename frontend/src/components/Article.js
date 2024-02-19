import './articleList.css';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getArticle } from "../api/articles.js";
import MDEditor from '@uiw/react-md-editor';

const init = async(id, setArticle) => {
  const tempArticle = await getArticle(id);
  setArticle(tempArticle);
}

export default function Articles() {
  const { id } = useParams();
  const [article, setArticle] = useState({
    "id": null,
    "name": null,
    "content": "",
    "updateTime": null,
    "isPublish": null,
  });

  useEffect(() => {
    init(id, setArticle);
  }, []);

  return (
    <>
      <div className="container" style={{ display: "inline" }}  data-color-mode="light">
        <MDEditor
          style={{ minHeight: "100%", borderRadius: "0 0 0 10px" }}
          value={article?.content}
          preview="preview"
          hideToolbar={true}
        />
      </div>
    </>
  );
}