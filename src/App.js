import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase/Config";
import Editor from "./editor/Editor";
import Sidebar from "./sidebar/Sidebar";
import Sidebaritem from "./sidebaritem/Sidebaritem";

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    db.collection("notes").onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setNotes(documents);
    });
  }, []);

  return (
    <div className="App">
      <Sidebar selectedNoteIndex={selectedNoteIndex} notes={notes} />
      <Editor />
    </div>
  );
}

export default App;
