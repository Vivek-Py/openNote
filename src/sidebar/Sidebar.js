import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import Sidebaritem from "../sidebaritem/Sidebaritem";

const Sidebar = (props) => {
  function newNoteBtnClick() {
    console.log("button clicked");
    setAddingNote(!addingNote);
    setTitle(null);
  }

  function updateTitle(txt) {
    console.log("Updating Title: ", txt);
    setTitle(txt);
  }

  function newNote() {
    console.log("Submitted: ", title);
    setTitle("");
  }

  function selectNote() {
    console.log("select note");
  }
  function deleteNote() {
    console.log("delete note");
  }

  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState("");
  const { notes, classes, selectedNoteIndex } = props;

  if (notes) {
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
          {addingNote ? "Cancel" : "New Note"}
        </Button>
        {addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter Note Title"
              onKeyUp={(e) => updateTitle(e.target.value)}
            />
            <Button className={classes.newNoteSubmitBtn} onClick={newNote}>
              Submit Note
            </Button>
          </div>
        ) : null}
        <List>
          {notes.map((note, index) => {
            return (
              <div key={index}>
                <Sidebaritem
                  note={note}
                  index={index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={selectNote}
                  deleteNote={deleteNote}
                />
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black",
  },
  newChatBtn: {
    borderRadius: "0px",
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px",
  },
  newNoteBtn: {
    width: "100%",
    height: "35px",
    borderBottom: "1px solid black",
    borderRadius: "0px",
    backgroundColor: "#29487d",
    color: "white",
    "&:hover": {
      backgroundColor: "#88a2ce",
    },
  },
  sidebarContainer: {
    marginTop: "0px",
    width: "300px",
    height: "100%",
    boxSizing: "border-box",
    float: "left",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  newNoteInput: {
    width: "100%",
    margin: "0px",
    height: "35px",
    outline: "none",
    border: "none",
    paddingLeft: "5px",
    "&:focus": {
      outline: "2px solid rgba(81, 203, 238, 1)",
    },
  },
  newNoteSubmitBtn: {
    width: "100%",
    backgroundColor: "#28787c",
    borderRadius: "0px",
    color: "white",
  },
});

export default withStyles(styles)(Sidebar);
