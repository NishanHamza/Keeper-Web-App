import { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("click", expand, true);
  });

  const expand = (event) => {
    if (!refOne.current.contains(event.target)) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    fetch("http://localhost:3001/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    props.onAdd();
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function handlePress(event){
    if (event.key === "Enter") {
      submitNote();
    }
  }

  return (
    <div>
      <Zoom in={true}>
        <form className="create-note" ref={refOne} onKeyDown={handlePress}>
          {isExpanded && (
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
          )}
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={isExpanded ? "3" : "1"}
          />
          <Zoom in={isExpanded ? true : false}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </Zoom>
    </div>
  );
}

export default CreateArea;
