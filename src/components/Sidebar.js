import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import Sidebaritem from "./Sidebaritem";
import styles from "../styles/sidebarStyles";

const Sidebar = (props) => {
  function newNoteBtnClick() {
    setAddingNote(!addingNote);
    setTitle(null);
  }

  function updateTitle(txt) {
    setTitle(txt);
  }

  function newNoteHere() {
    newNote(title);
    setAddingNote(!addingNote);
  }

  function selectingNote(n, i) {
    selectNote(n, i);
  }

  function deletingNote(note) {
    deleteNote(note);
  }

  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState("");
  const {
    notes,
    classes,
    selectedNoteIndex,
    selectNote,
    newNote,
    deleteNote,
    handleLogout,
  } = props;

  if (notes) {
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={handleLogout} className={classes.newNoteBtn}>
          Log Out?
        </Button>
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
            <Button className={classes.newNoteSubmitBtn} onClick={newNoteHere}>
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
                  selectingNote={selectingNote}
                  deletingNote={deletingNote}
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

export default withStyles(styles)(Sidebar);
