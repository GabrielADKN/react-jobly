import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
//css
import '../styles/Navbar.css';

const Navbar = () => {
  const { setToken, currentUser, LOCAL_STORAGE_KEY } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setToken(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand text-success logo-holder logo-6" to="/">
        <h3>Jobly <span>riel</span></h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {currentUser.username ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/companies">
                    Companies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/jobs">
                    Jobs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/${currentUser.username}`}>
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-dark" onClick={handleLogout}>
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
