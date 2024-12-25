import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../features/authSlice';
import { Link } from 'react-router-dom';
const RegisterPage = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer', // Default to customer
        phone: '',
    });

    const dispatch = useDispatch();

    const {error , loading } = useSelector((state)=>state.auth);
    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userRegister(userData)); // Dispatch registration action
    };

    return (
        <div className="container mt-5 ">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header text-center text-white secondary-bg" >
                            <h4>Join Us</h4>
                            <p>Sign up to explore opportunities</p>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* Name */}
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Ahmed Cleaning Services"
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="example@email.com"
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="********"
                                    />
                                </div>
    
                                {/* Role */}
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Sign up as</label>
                                    <select
                                        className="form-select"
                                        id="role"
                                        name="role"
                                        value={userData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="provider">Service Provider</option>
                                    </select>
                                </div>

                                {/* Phone */}
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number (optional)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleChange}
                                        placeholder="e.g., +2120304..."
                                    />
                                </div>
                                {/* Submit*/}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">{loading?'Creating Account...' :'Create Account'}</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center ">
                            <small>Already have an account? <Link to='/login'>Log in</Link></small>
                        </div>
                        <div>
                           {error && <p className='text-danger mt-2'>{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

