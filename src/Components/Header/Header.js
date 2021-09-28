import { Link, useLocation , useHistory } from "react-router-dom";

const Header = () => {
  let location = useLocation();
  let history = useHistory()
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <div className="d-flex">
            {!localStorage.getItem('token')?
            <>
             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} aria-current="page" to="/login">
                  Login
                </Link>
                </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/signup" ? "active" : ""}`} aria-current="page" to="/signup">
                  Sign Up
                </Link>
                </li>
                </ul>
              </>:<>
              <button className={`nav-link btn outline-none`} aria-current="page" onClick={()=>{localStorage.clear();history.push('/login')}}>
                  Logout
                </button>

              </>}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
