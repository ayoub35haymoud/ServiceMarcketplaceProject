import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchProfileData} from '../../features/profileSlice';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../public/image/profileAvatar.png'
const TopSectionProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { profileData , loading} = useSelector((state) => state.profile);
  
  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);
   
  if (loading) return <p>Loading...</p>;
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
          <img
              src={profileData && profileData.profile_picture ? profileData.profile_picture:defaultAvatar}
              alt={`${user?.name || "User"}'s profile`}
              className="img-fluid rounded-circle mb-3"
              style={{ maxWidth: '170px', border: '3px solid rgb(0, 0, 0)' }}
           />
          </div>
          <div className="col-md-6">
            <h4 className="mb-3">Welcom {user.name}</h4>
            <button
              className="btn btn-primary btn-lg "
              onClick={() => navigate('/edite-profile')}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSectionProfile;




