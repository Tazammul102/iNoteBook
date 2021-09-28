import { useContext, useEffect, useRef ,useState} from "react";
import { useHistory } from "react-router";
import ions from "../../asserts/load.gif";
import noteContext from "../../context/noteContext";

const NotesCard = () => {
  const notesContext = useContext(noteContext);
  let history = useHistory()
  const ref = useRef(null);
  const { notes, deleteNotes, loading , updateNotes , getNotes } = notesContext;
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      getNotes()
    }else{
      history.push('/login')
    }

    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({id:"",title:"",tag:"",desc:""})
  const handleUpdateClick = (unote) => {
    ref.current.click();
    setNote({id:unote._id,title:unote.title , desc:unote.description , tag:unote.tag})
  };
  const {id , title , tag , desc} = note;
  const handleSubmit = (e) => {
    e.preventDefault()
    updateNotes(id , title , desc ,tag)
    ref.current.click()
  }
  const onChange = (e) => {
    setNote({...note , [e.target.name]:e.target.value})
  }
  return (
    <div className="row">
      <button
        type="button"
        ref={ref}
        className="btn btn-primary visually-hidden"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        visually-hidden
      </button>

      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* Modal Form */}
                <div className="container">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      name="title"
                      value={note.title}
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      name="tag"
                      value={note.tag}
                      minLength={5}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      name="desc"
                      value={note.desc}
                      onChange={onChange}
                      rows="3"
                      minLength={5}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12"></div>
                </div>
                {/* Modal Form */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <hr className="my-2 mt-4" />
      <h2 className="my-4">Notes :-</h2>
      {loading ? (
        <div className="doder">
          <div className="imgr">
            {" "}
            <img src={ions} alt="" className="text-center" />
          </div>
        </div>
      ) : 
      <>
      {notes.length !== 0 ? (
        <div className="row">
          {notes.map((note) => {
            return (
              <div
                className="card relative my-3 mx-2 shadow col-md-3"
                key={note.date}
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <span className="badge bg-dark">{note.tag}</span>
                  <h5 className="card-title">{note.title}</h5>
                  <p
                    className="card-text"
                    style={{
                      minHeight: "150px",
                      height: "150px",
                      overflow: "auto",
                    }}
                  >
                    {note.description}
                  </p>
                  <button
                    onClick={() => {
                      handleUpdateClick(note);
                    }}
                    className="btn btn-primary btn-sm fs-6"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2 btn-sm fs-6"
                    onClick={() => {
                      deleteNotes(note._id);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card">
          <h3 className="text-center text-info">
            Notes Not Found! Please Add a Notes
          </h3>
        </div>
      )}
      </>}
    </div>
  );
};

export default NotesCard;
