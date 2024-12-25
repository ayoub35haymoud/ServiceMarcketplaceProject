import React, { useState , useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfileData}  from '../features/profileSlice';
const EditProfile = () => {
  const [formData, setFormData] = useState({
    bio: "",
    address: "",
    profile_picture: null,
    experience: "",
    employees_count: "",
    business_hours: [
      { day: "Monday", open: "09:00", close: "17:00" },
      { day: "Tuesday", open: "09:00", close: "17:00" },
    ],
    social_media_links: [
      { platform: "Facebook", url: "" },
      { platform: "Instagram", url: "" },
    ],
  });

  const dispatch = useDispatch();
  {/* fetch profile data  */}
  useEffect(()=>{
    dispatch(fetchProfileData());
  },[dispatch]);
  const profileData = true;
//   const { profileData } = useSelector((state)=> state.profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  const handleBusinessHoursChange = (index, field, value) => {
    const updatedHours = [...formData.business_hours];
    updatedHours[index][field] = value;
    setFormData({ ...formData, business_hours: updatedHours });
  };

  const handleSocialLinksChange = (index, value) => {
    const updatedLinks = [...formData.social_media_links];
    updatedLinks[index].url = value;
    setFormData({ ...formData, social_media_links: updatedLinks });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      profileData.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
    });

    console.log("Submitted data:", profileData);
  };

 return (
    <div className="container mt-5 px-5">
      <h2 className="mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Profile Picture with Live Preview */}
        <div className="mb-4">
          <label htmlFor="profile_picture" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            id="profile_picture"
            name="profile_picture"
            onChange={handleFileChange}
          />
          {formData.profile_picture && (
            <img
              src={URL.createObjectURL(formData.profile_picture)}
              alt="Preview"
              className="mt-3 rounded-circle"
              style={{ maxWidth: "120px", border: "2px solid #007bff" }}
            />
          )}
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            className="form-control"
            id="bio"
            name="bio"
            rows="3"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
          />
        </div>

        {/* Experience and bumber of empolyes*/}
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="experience" className="form-label">
              Years of Experience
            </label>
            <input
              type="number"
              className="form-control"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Enter years of experience"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="employees_count" className="form-label">
              Number of Employees
            </label>
            <input
              type="number"
              className="form-control"
              id="employees_count"
              name="employees_count"
              value={formData.employees_count}
              onChange={handleInputChange}
              placeholder="Enter number of employees"
            />
          </div>
        </div>

        {/* Business Hours */}
        <div className="mb-4">
          <label className="form-label">Business Hours</label>
          {formData.business_hours.map((hour, index) => (
            <div className="row mb-2" key={index}>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  value={hour.day}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  value={hour.open}
                  onChange={(e) =>
                    handleBusinessHoursChange(index, "open", e.target.value)
                  }
                />
              </div>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  value={hour.close}
                  onChange={(e) =>
                    handleBusinessHoursChange(index, "close", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="mb-4">
          <label className="form-label">Social Media Links</label>
          {formData.social_media_links.map((link, index) => (
            <div className="row mb-2" key={index}>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  value={link.platform}
                  disabled
                />
              </div>
              <div className="col-md-8">
                <input
                  type="url"
                  className="form-control"
                  placeholder={`Enter your ${link.platform} URL`}
                  value={link.url}
                  onChange={(e) =>
                    handleSocialLinksChange(index, e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        {/* hndling of button */}
        { !profileData  ?
            <button type="submit" className="btn btn-primary w-100 ">
                Add information
            </button>
            :
            <button type="submit" className="btn btn-primary w-100">
                Save Changes
            </button>
        } 
      </form>
    </div>
  );
};

export default EditProfile;



