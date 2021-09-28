import {useContext, useEffect, useState} from 'react'
import noteContext from '../../context/noteContext'

const AddNote = () => {
  const context = useContext(noteContext);
  const {addNote } = context;
  const [note, setNote] = useState({title:"",tag:"",desc:""})
  const [username, setUsername] = useState('')
  const {title , tag , desc} = note;
  const handleSubmit = (e) => {
    e.preventDefault()
    if (tag==="") {
      setNote(note.tag = "General")
    }
    addNote(title , desc , tag)
    setNote({title:"",tag:"",desc:""})
  }
  const onChange = (e) => {
    setNote({...note , [e.target.name]:e.target.value})
  }
  useEffect(() => {
    let headersList = {
      "auth-token": localStorage.getItem('token')
     }
     
     fetch("http://localhost:5000/api/auth/getuser", { 
       method: "POST",
       headers: headersList
     }).then(function(response) {
       return response.json();
     }).then(function(data) {
       setUsername(data.name)
     })
    
  }, [])

  return (
    <div className="container">
      <h3 className="text-center" style={{textTransform:'capitalize'}}>Welcome {username}</h3>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name={"title"}
          value={note.title}
          onChange={onChange}
          minLength={5}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name={"tag"}
          value={note.tag}
          minLength={5}
          maxLength={30}
          placeholder="Maximum 30 Characters"
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          name={"desc"}
          value={note.desc}
          onChange={onChange}
          rows="3"
          minLength={5}
          required
        ></textarea>
      </div>
      <div className="col-12">
    <button className="btn btn-dark" type="submit"><i className="bi bi-plus-lg"></i> Add Note</button>
  </div>
  </form>
    </div>
  );
};

export default AddNote;
