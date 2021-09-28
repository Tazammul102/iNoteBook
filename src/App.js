import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Authentiation/Login";
import Signup from "./Components/Authentiation/Signup";
import Header from "./Components/Header/Header";
import AddNote from "./Components/Pages/AddNote";
import NotesCard from "./Components/Pages/NotesCard";
import NoteState from "./context/NoteState";

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Header />
          <div className="container my-3">
            <Switch>
              <Route exact path="/">
                <AddNote />
                <NotesCard />
              </Route>
              <Route exact path="/login">
                <h1 className="mb-4 text-center">Login</h1>
                <Login />
              </Route>
              <Route exact path="/signup">
                <h1 className="mb-4 text-center">Sign Up</h1>
                <Signup />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
