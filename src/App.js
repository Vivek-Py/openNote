import { useEffect, useState } from "react";
import "./App.css";
import { db, fire } from "./firebase/Config";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import firebase from "firebase";
import "firebase/auth";
import Logform from "./components/Logform";

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [check, setcheck] = useState(false);

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  });

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
      {user ? (
        <div>
          <Sidebar
            selectedNoteIndex={selectedNoteIndex}
            notes={notes}
            selectNote={selectNote}
            newNote={newNote}
            deleteNote={deleteNote}
            handleLogout={handleLogout}
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
      ) : (
        <Logform
          setEmail={setEmail}
          handleLogin={handleLogin}
          setPassword={setPassword}
          clearErrors={clearErrors}
          user={user}
          setUser={setUser}
          email={email}
          setEmailError={setEmailError}
          password={password}
          passwordError={passwordError}
          emailError={emailError}
          handleSignup={handleSignup}
        />
      )}
    </div>
  );
}

export default App;
