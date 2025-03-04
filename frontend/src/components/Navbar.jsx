// import { Link, useNavigate , useLocation} from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';
// import { logout } from '../features/authSlice';
// import Avatar from '../../public/image/profileAvatar.png';
// import '../styles/Navbar.css';
// import SearchBar from '../components/search/SearchBar';

// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {user} = useSelector((state) => state.auth);
//   const profile = user?.profile;
//   const token = localStorage.getItem('token');

//   const location = useLocation();
//   const isSearchPage = location.pathname.startsWith('/search');
//   // Logout handler
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   // Dropdown toggle handler
//   const toggleDropdown = () => {
//     setIsDropdownOpen((prevState) => !prevState);
//   };

//   // Close dropdown when clicked outside
//   useEffect(() => {
//     const closeDropdown = (e) => {
//       if (!e.target.closest('.dropdown')) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('click', closeDropdown);
//     return () => {
//       document.removeEventListener('click', closeDropdown);
//     };
//   }, []);
//   return (
//     <nav className="navbar navbar-expand-lg  navbar-light bg-white shadow-sm px-4 sticky-top">
//       <div className="container">
//         {/* Logo */}
//         <Link className="navbar-brand d-flex align-items-center" to="/">
//           <img src="/img/logo.png" alt="Logo" style={{ width: '30px', height: '30px' }} />
//           <span className="ms-2 fw-bold">BRIKOLE</span>
//         </Link>

//         {/* Navigation Links */}
//         <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
//           <ul className="navbar-nav mx-auto">
//             {(isSearchPage || token) && (
//                 <li className="nav-item">
//                   <SearchBar />
//                 </li>
//               )}
//           </ul>

//           {/* Login, Register, Profile */}
//           <div className="d-flex align-items-center">
//             {!token ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="btn border-primary text-primary rounded-pill me-3 fw-bold px-4 py-2 "
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="btn btn-primary rounded-pill fw-bold px-3 py-2 text-white"
//                 >
//                   Register
//                 </Link>
//               </>
//             ) : (
//               <div className="dropdown">
//                 <button
//                   className=" rounded-circle border-0 position-relative"
//                   onClick={toggleDropdown}
//                   style={{ background: 'none', boxShadow: '0 0 4px rgba(0,0,0,0.5)' }}
//                 >
//                   <img
//                     src={profile ? profile.profile_picture: Avatar}
//                     alt="Profile"
//                     className="rounded-circle"
//                     style={{ width: '60px', height: '60px', objectFit: 'cover' }}
//                   />
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isDropdownOpen && (
//                   <div
//                     className="dropdown-menu dropdown-menu-end show shadow-sm"
//                     style={{
//                       top: '100%',
//                       right: 0,
//                       minWidth: '200px',
//                       zIndex: 1000,
//                     }}
//                   >
//                     <Link to={user?.role === "provider"? 'provider-dashboard' : 'customer-dashboard'} 
//                      className="dropdown-item"
//                     >
//                       Profile
//                     </Link>

//                     <Link to={user.role === "provider"? 'provider-dashboard' : 'customer-dashboard'}
//                      className="dropdown-item"
//                      >
//                       Settings
//                     </Link>
//                     {/* <Link to="/BecomeSaller" className="dropdown-item">
//                       Become a Seller
//                     // </Link>  => future we need to add this*/}
//                     <div className="dropdown-divider"></div>
//                     <button
//                       className="dropdown-item text-danger"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../features/authSlice';
import Avatar from '../../public/image/profileAvatar.png';
import SearchBar from '../components/search/SearchBar';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const profile = user?.profile;
  const token = localStorage.getItem('token');

  const location = useLocation();
  const isSearchPage = location.pathname.startsWith('/search');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-2 sticky top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link className="flex items-center space-x-2" to="/">
          <img src="/img/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-bold">BRIKOLE</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow flex justify-center">
          {(isSearchPage || token) && <SearchBar />}
        </div>

        {/* Auth / Profile */}
        <div className="flex items-center space-x-4">
          {!token ? (
            <>
              <Link to="/login" className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-blue-100">
                Login
              </Link>
              <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600">
                Register
              </Link>
            </>
          ) : (
            <div className="relative dropdown">
              <button
                className="rounded-full border-0 relative flex items-center"
                onClick={toggleDropdown}
              >
                <img
                  src={profile ? profile.profile_picture : Avatar}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover shadow-md"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2 z-50">
                  <Link to={user?.role === "provider" ? 'provider-dashboard' : 'customer-dashboard'}
                    className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to={user?.role === "provider" ? 'provider-dashboard' : 'customer-dashboard'}
                    className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </Link>
                  <div className="border-t my-2"></div>
                  <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



