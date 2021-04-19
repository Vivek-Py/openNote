import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";

const Sidebaritem = (props) => {
  function setNote(n, i) {
    selectNote(n, i);
  }
  function dltNote(note) {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      deleteNote(note);
    }
  }
  const {
    index,
    note,
    classes,
    selectedNoteIndex,
    selectNote,
    deleteNote,
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

const styles = (theme) => ({
  listItem: {
    cursor: "pointer",
  },
  textSection: {
    maxWidth: "85%",
  },
  deleteIcon: {
    position: "absolute",
    right: "5px",
    top: "calc(50% - 15px)",
    "&:hover": {
      color: "red",
    },
  },
});

export default withStyles(styles)(Sidebaritem);
