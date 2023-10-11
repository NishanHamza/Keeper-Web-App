import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Zoom from "@mui/material/Zoom";

function Note(props) {
  const [isclicked, setIsclicked] = useState(false);
  function handleClick(event) {
    const id = props.id;
    props.onDelete(id);
  }

  function cutClick(){
     setIsclicked(true);
  }

  return (
     <Zoom in={true}>
    <div className="note">
      <h1>
      { isclicked ? <s>{props.title}</s> : props.title }
      </h1>
      <p>{props.content}</p>
      
      <button className="delete" onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button className="cut" onClick={cutClick} >
        <CheckCircleIcon />
      </button>
    </div>
    </Zoom>
  );
}

export default Note;
