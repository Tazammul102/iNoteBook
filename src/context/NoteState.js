import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = `http://localhost:5000`;
  let initialn = [];
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(initialn);
  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setLoading(false);
    setNotes(json);
  };
  //   Add Note
  const addNote = async (title, description, tag) => {
    let headersList = {
      "auth-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    };

    let responce = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      body: JSON.stringify({ title, description, tag }),
      headers: headersList,
    });
    let note = await responce.json();
    setNotes(notes.concat(note));
  };
  // Update Note
  const updateNotes = async (id, title, description, tag) => {
    let headersList = {
      "auth-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    };

    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, description, tag }),
      headers: headersList,
    });
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  const deleteNotes = async (id) => {
    let headersList = {
      "auth-token": localStorage.getItem("token"),
    };

    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: headersList,
    });
    // console.log("Delete Note With id : " , id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  const popAlert = (msg, type) => {
    return (
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        You should check in on some of those
        fields below.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    );
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, updateNotes, deleteNotes, loading, getNotes  , popAlert}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
