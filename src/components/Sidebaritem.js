import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../other/helpers";
import styles from "../styles/sidebarItemStyles";

const Sidebaritem = (props) => {
  function setNote(n, i) {
    selectingNote(n, i);
  }
  function dltNote(note) {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      deletingNote(note);
    }
  }
  const {
    index,
    note,
    classes,
    selectedNoteIndex,
    selectingNote,
    deletingNote,
  } = props;

  return (
    <div key={index}>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === index}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => setNote(note, index)}
        >
          <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0, 30) + "...")}
          ></ListItemText>
        </div>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={() => dltNote(note)}
        ></DeleteIcon>
      </ListItem>
    </div>
  );
};

export default withStyles(styles)(Sidebaritem);
