import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 

const AboutSection = () => {
 
  
  // Initialize the navigate function for page navigation
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const profile = user?.profile ;

  if(!user && !profile){
    return <div>loading aboute....</div>;
  }
 
  // Destructure profile data for better usage
  const {
    profile_picture,
    bio,
    address,
    employees_count,
    experience,
    social_media_links,
    phone,
    email,
  } = profile;
  const Parce_social_media_links = JSON.parse(social_media_links);
  const handleEditClick = () => {
    // Navigate to the edit page when the button is clicked
    navigate("/edite-profile");
  };
  return (
    <div className="container mt-4">
      {/* Profile Header Section */}
      <div className="card mb-4 p-3 shadow-sm">
        <div className="d-flex align-items-center">
          <img
            src={profile_picture}
            alt="Photo de profil"
            className="rounded-circle me-3"
            style={{ width: "70px", height: "70px", objectFit: "cover" }}
          />
          <button
            className="btn btn-outline-secondary btn-sm ms-auto"
            onClick={handleEditClick} // Add the onClick handler
          >
            <i className="fas fa-edit"></i> Modifier
          </button>
        </div>
      </div>
       {/* bio Section */}
       <div>
        <div className="card mb-4 p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <p className="m-2">bio</p>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleEditClick} // Add the onClick handler
              >
                <i className="fas fa-edit"></i> Modifier
              </button>
            </div>
            <p>{bio || "Pas de biographie disponible"}</p>    
          </div>
        </div>
      {/* Personal Information Section */}
      <div className="card mb-4 p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Informations personnelles</h6>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleEditClick} // Add the onClick handler
          >
            <i className="fas fa-edit"></i> Modifier
          </button>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <p className="mb-1 text-muted">Adresse e-mail</p>
            <p>{email || "Non fourni"}</p>
          </div>
          <div className="col-md-6">
            <p className="mb-1 text-muted">Téléphone</p>
            <p>{phone || "Non fourni"}</p>
          </div>
          <div className="col-md-6">
            <p className="mb-1 text-muted">Expérience</p>
            <p>{experience ? `${experience} ans` : "Non fourni"}</p>
          </div>
          <div className="col-md-6">
            <p className="mb-1 text-muted">Employés</p>
            <p>{employees_count || "Non fourni"}</p>
          </div>
          <div className="col-md-6">
            <p className="mb-1 text-muted">address</p>
             <p className="mb-0">{address || "Adresse non fournie"}</p>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="card mb-4 p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Réseaux sociaux</h6>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleEditClick} // Add the onClick handler
          >
            <i className="fas fa-edit"></i> Modifier
          </button>
        </div>
        <div className="d-flex gap-3 mt-3 ">
          {
            Parce_social_media_links.map((platform , index)=>{
              if(platform.platform == "Facebook"){
                  return(
                  <a href={platform.url} target="_blank" rel="noopener noreferrer" key={index} className="border border-2 border-dark rounded-pill px-5 py-1">
                    <i className="fab fa-facebook" style={{ fontSize: "24px", color: "#000000" }}></i>
                  </a>)
                }
              if(platform.platform == "Instagram"){
                  return(
                  <a href={platform.url} target="_blank" rel="noopener noreferrer" key={index} className="border border-2 border-dark rounded-pill px-5 py-1">
                    <i className="fab fa-instagram" style={{ fontSize: "24px", color: "#000000" }}></i>
                  </a>)
                }
            })   
          }
          
          
        </div>
      </div>

      {/* Address Section */}
      <div className="card mb-4 p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Adresse</h6>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleEditClick} // Add the onClick handler
          >
            <i className="fas fa-edit"></i> Modifier
          </button>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <p>{address || "Aucune adresse disponible"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;


