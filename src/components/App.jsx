import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";


function App() {
  const [notes, setNotes] = useState([]);

  function onAdd() {
    fetch("http://localhost:3001/data")
      .then((res) => res.json())
      .then(
        (result) => {
          setNotes(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onAdd();

  function onDelete(id) {
    const catchId = {noteId : id};
    fetch("http://localhost:3001/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(catchId),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={onAdd} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={onDelete}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
