import { Link, useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { logout } from '../features/authSlice'; 

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/img/logo.png" alt="Logo" style={{ width: '30px', height: '30px' }} />
          <span className="ms-2 fw-bold">BRIKOLE</span>
        </Link>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link fw-bold text-dark" to="/">
                Home
              </Link>
            </li>
          </ul>

          {/* Login, Register, and Logout */}
          <div>
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary  rounded-pill me-3 fw-bold px-4 py-1.5"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary rounded-pill fw-bold px-3 py-2 text-white"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-primary rounded-pill fw-bold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


