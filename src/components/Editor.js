import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
//import { Check } from "@material-ui/icons";
import styles from "../styles/editorStyles";

const Editor = (props) => {
  const { classes, selectedNote, noteUpdate } = props;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setText(selectedNote.body);
    setTitle(selectedNote.title);
    setId(selectedNote.id);
  }, [selectedNote.body, selectedNote.id, selectedNote.title, id]);

  useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        noteUpdate(id, {
          title: title,
          body: text,
        }),
      1500
    );
    return () => clearTimeout(timeOutId);
  }, [id, text, title, noteUpdate]);

  function updateTitle(txt) {
    setTitle(txt);
  }

  const updateBody = (val) => {
    setText(val);
  };

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        placeholder="Note title..."
        value={title ? title : ""}
        onChange={(e) => updateTitle(e.target.value)}
      ></input>
      <ReactQuill value={text} onChange={updateBody} />
    </div>
  );
};

export default withStyles(styles)(Editor);
