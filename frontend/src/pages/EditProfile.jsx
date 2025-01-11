import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData, createProfileData, updateProfileData } from "../features/profileSlice";

const EditProfile = () => {
  const [preImage, setPreImage] = useState(null);
  const [formData, setFormData] = useState({
    bio: "",
    address: "",
    profile_picture: null,
    experience: "",
    employees_count: "",
    business_hours: [
      { day: "Monday", start: "08:00", end: "18:00" },
      { day: "Tuesday", start: "08:00", end: "18:00" },
      { day: "Wednesday", start: "08:00", end: "18:00" },
      { day: "Thursday", start: "08:00", end: "18:00" },
      { day: "Friday", start: "08:00", end: "18:00" },
      { day: "Saturday", start: "08:00", end: "18:00" },
      { day: "Sunday", start: "08:00", end: "18:00" },
    ],
    social_media_links: [
      { platform: "Facebook", url: "" },
      { platform: "Instagram", url: "" },
    ],
  });

  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profile);
  // Fetch profile data only on first render
  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  // Update formData with profileData only when profileData is available
  useEffect(() => {
    if (profileData) {
      setFormData((prevData) => ({
        ...prevData,
        bio: profileData.bio || "",
        address: profileData.address || "",
        profile_picture: profileData.profile_picture || null,
        experience: profileData.experience || "",
        employees_count: profileData.employees_count || "",
        business_hours:
          profileData.business_hours && typeof profileData.business_hours === "string"
            ? JSON.parse(profileData.business_hours)
            : formData.business_hours,
        social_media_links:
          profileData.social_media_links && typeof profileData.social_media_links === "string"
            ? JSON.parse(profileData.social_media_links)
            : formData.social_media_links,
      }));
    }
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile_picture: file });
      const previewUrl = URL.createObjectURL(file);
      setPreImage(previewUrl);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileDataForm = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      profileDataForm.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
    });

    if (profileData) {
      profileDataForm.append("_method", "PUT");
      console.log(formData);
      await dispatch(updateProfileData(profileDataForm)); // Wait for the update to finish
    } else {
      await dispatch(createProfileData(profileDataForm)); // Wait for the creation to finish
    }

    // Refetch the profile data to update the form
    dispatch(fetchProfileData());
  };

  return (
    <div className="container mt-5 px-5">
      <h2 className="mb-4 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Profile Picture with Live Preview */}
        <div className="mb-4 text-center">
          <label htmlFor="profile_picture" className="form-label">
            Profile Picture
          </label>
          {formData.profile_picture && (
            <img
              src={preImage || formData.profile_picture}
              alt="Preview"
              className="mt-3 rounded-circle mx-5 my-3"
              style={{ width: "130px", height: "130px"  , border: "2px solid #007bff" }}
            />
          )}
          <input
            type="file"
            className="form-control"
            id="profile_picture"
            name="profile_picture"
            onChange={handleFileChange}
          />
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

        {/* Experience and Employees Count */}
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
                  value={hour.start}
                  onChange={(e) =>
                    handleBusinessHoursChange(index, "start", e.target.value)
                  }
                />
              </div>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  value={hour.end}
                  onChange={(e) =>
                    handleBusinessHoursChange(index, "end", e.target.value)
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

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          {profileData ? "Save Changes" : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;



