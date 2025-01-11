import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createService ,fetchCategories , fetchSub_Categories } from "../../features/servicesSlice";
import '../../styles/AddService.css';
import AddServiceForm from "./AddServiceForm";


const AddService = () => {
  const [services, setServices] = useState([]); // Local state for services
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle form display
  const [selectedService, setSelectedService] = useState(null); // Selected service for details
  const [serviceData, setServiceData] = useState({
    subcategories_id : '',
    title: '',
    description: '',
    zipcode: '',
    price: '',
    featured_projects: [],
    status: 'active',
  });
  
  const [imagePreviews, setImagePreviews] = useState([]); // To store live image previews
  const dispatch = useDispatch();

  // fetch the categories and sub-categories
  useEffect(()=>{
    dispatch(fetchCategories());
    dispatch(fetchSub_Categories());
  },[dispatch])

  const { loading , servicesCategories , sub_categories } = useSelector((state) => state.services)

 
  // Handle form input changes
  const handleChange = (e) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedImages = Array.from(files);

    setServiceData(prevState => ({
      ...prevState,
      featured_projects: [...prevState.featured_projects, ...selectedImages]  // Add selected files to the array
    }));

    // Create image previews for live display
    const previews = selectedImages.map(file => URL.createObjectURL(file));
    setImagePreviews(prevPreviews => [...prevPreviews, ...previews]);
  };
  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (serviceData.price <= 0) {
      alert("Price must be a positive number!");
      return;
    }

    // Add to Redux and local state
    dispatch(createService(serviceData))
      .unwrap()
      .then((newService) => {
        setServices([...services, newService]);
        setIsFormOpen(false); // Close form
        setServiceData({ title: "", description: "", price: "", image: "" });
      })
      // .catch((err) => console.error("Error adding service:", err));
  };

  // Open form to add a new service
  const openForm = () => {
    setIsFormOpen(true);
    setSelectedService(null); // Ensure no service is selected
  };

  // Show details of a selected service
  const showServiceDetails = (service) => {
    setSelectedService(service);
  };
  
  return (
    <div className="container mt-4 ">
      <div className="row g-4">
        {/* Add Service Card */}
        <div className="col-md-3">
          <div className="cardAddservice">
            <div className="card-body text-center">
               <i className="fa-solid fa-circle-plus fa-2xl" onClick={openForm}></i>
               <p className="mt-3 fw-bold">Create New Service</p>
               <p className="card-content">Add a service to show clients what you offer and make booking you easy</p>
            </div>
          </div>
        </div>

        {/* Existing Services */}
        {services.map((service, index) => (
          <div
            className="col-md-3"
            key={index}
            onClick={() => showServiceDetails(service)}
          >
            <div className="card h-100 service-card">
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Form Modal */}
    {isFormOpen && ( <AddServiceForm selectedService={selectedService} 
      handleSubmit={handleSubmit} 
      serviceData={serviceData}
      handleChange={handleChange}
      servicesCategories={servicesCategories}
      handleImageChange={handleImageChange}
      setServiceData={setServiceData}
      setIsFormOpen={ setIsFormOpen}
      imagePreviews={imagePreviews}
      loading={loading}
      setImagePreviews={setImagePreviews}
      sub_categories={sub_categories}
      />
    )}
      {/* Service Details Modal */}
      {selectedService && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Service Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedService(null)}
                ></button>
              </div>
              <div className="modal-body">
                <h5>{selectedService.title}</h5>
                <p>{selectedService.description}</p>
                <p>
                  <strong>Price:</strong> ${selectedService.price}
                </p>
                {selectedService.image && (
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="img-fluid"
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedService(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddService;

