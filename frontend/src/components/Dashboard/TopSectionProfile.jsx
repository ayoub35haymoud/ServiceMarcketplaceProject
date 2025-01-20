import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../public/image/profileAvatar.png';
import SkeletonProfile from '../Skeletons/SkeletonProfile';
const TopSectionProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
     const profile = user?.profile;
 // I use user becaue loadin it not working and the value user was null so components dont work 
 if(!user){
  return <SkeletonProfile/>
}
  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
          <img
              src={profile && profile.profile_picture ? profile.profile_picture:defaultAvatar}
              alt={`${user?.name || "User"}'s profile`}
              className="rounded-circle me-3"
              style={{ width: "140px", height: "140px", objectFit: "cover" , boxShadow : '0 0 5px rgba(0,0,0,0.5)' }}
           />
          </div>
          <div className="col-md-6">
            <h4 className="mb-3">Welcom back {user.name}</h4>
            {/* diplay the buton just in the first time */}
            {!profile && <button
              className="btn border border-2  border-primary btn-lg "
              onClick={() => navigate('/edite-profile')}
            >
              create profile
            </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSectionProfile;




