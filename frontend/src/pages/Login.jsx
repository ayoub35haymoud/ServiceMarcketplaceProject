import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error ,token  } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLogin(formData));
  };

  // navigate to the dashboard
  useEffect(() => {
    if (token){
      navigate('/');
    }
  },[token , navigate]);
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="e.g., example@email.com"
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary  w-100"
            disabled={loading}
            // style={{backgroundColor :'#1E88E5'}}
          >{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        {/* Register Link */}
        <div className="text-center mt-3">
          <p>
            Dont have an account?{' '}
            <Link to='/register'>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
