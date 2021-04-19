import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black",
  },
  titleInput: {
    height: "50px",
    boxSizing: "border-box",
    border: "none",
    padding: "5px",
    fontSize: "24px",
    width: "calc(100% - 300px)",
    backgroundColor: "#29487d",
    color: "white",
    paddingLeft: "50px",
  },
  editIcon: {
    position: "absolute",
    left: "310px",
    top: "12px",
    color: "white",
    width: "10",
    height: "10",
  },
  editorContainer: {
    height: "100%",
    boxSizing: "border-box",
  },
});

const Editor = (props) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  const updateBody = (val) => {
    setText(val);
    update();
  };

  const update = useRef(
    debounce(() => {
      console.log("UPDATING DATA:", text);
    }, 2000)
  ).current;

  const { classes } = props;
  return (
    <div className={classes.editorContainer}>
      <ReactQuill value={text} onChange={updateBody} />
    </div>
  );
};

export default withStyles(styles)(Editor);
