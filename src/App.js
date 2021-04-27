import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase/Config";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import firebase from "firebase";

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [check, setcheck] = useState(false);

  useEffect(() => {
    db.collection("notes")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setNotes(documents);
      });
  }, []);

  useEffect(() => {
    setSelectedNote(notes[0]);
    setSelectedNoteIndex(0);
  }, [check, notes]);

  function selectNote(note, index) {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  }

  function noteUpdate(id, noteObj) {
    db.collection("notes").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
    });
  }

  async function newNote(title) {
    const noteInner = {
      title: title,
      body: "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("notes").add({
      title: noteInner.title,
      body: noteInner.body,
      timestamp: noteInner.timestamp,
    });

    setcheck(!check);

    /*
    const newID = newFromDB.id;
    const newNoteIndex = notes.indexOf(
      notes.filter((_note) => {
        return _note.id === newID;
      })
    );
    */
  }

  function deleteNote(note) {
    const noteIndex = notes.indexOf(note);
    setNotes(notes.filter((_note) => _note !== note));
    if (selectedNoteIndex === noteIndex) {
      setSelectedNoteIndex(null);
      setSelectedNote(null);
    } else {
      notes.length > 1
        ? selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1)
        : setSelectedNoteIndex(null);
      setSelectedNote(null);
    }
    db.collection("notes").doc(note.id).delete();
  }

  return (
    <div className="App">
      <Sidebar
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        selectNote={selectNote}
        newNote={newNote}
        deleteNote={deleteNote}
      />
      {selectedNote ? (
        <Editor
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
        />
      ) : null}
    </div>
  );
}

export default App;
