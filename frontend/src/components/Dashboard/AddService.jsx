import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createService } from "../../features/servicesSlice";

const AddService = () => {
  const [services, setServices] = useState([]); // Local state for services
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle form display
  const [selectedService, setSelectedService] = useState(null); // Selected service for details
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.services);

  // Handle form input changes
  const handleChange = (e) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceData.title || !serviceData.description || !serviceData.price) {
      alert("Please fill out all required fields!");
      return;
    }

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
      .catch((err) => console.error("Error adding service:", err));
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
          <div
            className="card add-card h-100 d-flex align-items-center justify-content-center"
            onClick={openForm}
          >
            <p className="text-primary fs-4 m-0">+ Add Service</p>
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
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedService ? "Edit Service" : "Add New Service"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsFormOpen(false)}
                ></button>
              </div>
              <div className="modal-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="title" className="form-label">Service Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={serviceData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={serviceData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="price" className="form-label">Price ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={serviceData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="image" className="form-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="image"
                      name="image"
                      value={serviceData.image}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => setIsFormOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Saving..." : "Save Service"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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

