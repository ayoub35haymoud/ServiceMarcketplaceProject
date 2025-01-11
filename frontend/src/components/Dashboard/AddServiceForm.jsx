import { useState}from 'react';
import PropTypes from "prop-types";
export default function AddServiceForm(props) {
  const {
    selectedService , 
    handleSubmit , 
    serviceData , 
    handleChange , 
    servicesCategories , 
    handleImageChange , 
    setServiceData,
    setIsFormOpen,
    imagePreviews,
    loading,
    setImagePreviews,
    sub_categories
  } = props;
  
  // for store the id of category selected
  const [category_id , setcategory_id] = useState();

  const handleChangeCategory_id = (e)=>{
    setcategory_id(e.target.value);
  }
  // filter and store just the subcategorie with the categorie id selected
  const filterSubcategories = sub_categories.filter(
    (sub_category)=> sub_category.service_categories_id === parseInt(category_id) 
  );
  return (
    (
      <div className="modal-overlay" >
        <div className="modal-dialog " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <div className="modal-content ">
            <div className="modal-header justify-content-center mt-3">
              <h5 className="modal-title">
                {selectedService ? "Edit Service" : "Add New Service"}
              </h5>
            </div>
            <div className="modal-body px-5 pb-3" >
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="category_id" className="form-label">Category</label>
                  <select
                    className="form-control"
                    id="category_id"
                    name="category_id"
                    value={category_id}
                    onChange={handleChangeCategory_id}
                    required
                  >
                      <option value="">Select a category</option>
                      {servicesCategories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
                
              {category_id && 
                <div className='form-group mb-3'>
                    <label htmlFor="subcategories_id">sub_categorie</label>
                    <select
                     className="form-control"
                      name='subcategories_id'
                      value={serviceData.subcategories_id}
                      id='subcategories_id'
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a sub_categorie</option>
                      {filterSubcategories.map((sub_category)=>
                        <option value={sub_category.id} key={sub_category.id}>{sub_category.name}</option>
                      )}
                    </select>
                </div> }

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
                  <label htmlFor="zipcode" className="form-label">Zipcode</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipcode"
                    name="zipcode"
                    value={serviceData.zipcode}
                    onChange={handleChange}
                    required
                  />
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
                  <label htmlFor="featured_projects" className="form-label">Upload Project Images</label>
                  <input
                    type="file"
                    className="form-control"
                    id="featured_projects"
                    name="featured_projects"
                    multiple
                    onChange={handleImageChange}
                  />
                  <small className="form-text text-muted">You can upload multiple images.</small>
                </div>

                {/* Live Image Previews (Displayed as Cards) */}
                {imagePreviews.length > 0 && (
                  <div className="mb-3">
                    <h5>Selected Images</h5>
                    <div className="d-flex flex-wrap">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="card m-2" style={{ width: '150px' }}>
                          <img src={preview} alt={`Preview ${index}`} className="card-img-top" />
                          <div className="card-body">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                setServiceData(prevState => {
                                  const newFiles = prevState.featured_projects.filter((_, i) => i !== index);
                                  return { ...prevState, featured_projects: newFiles };
                                });
                                setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
    ))
  }
  AddServiceForm.propTypes = {
    selectedService: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    serviceData: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    servicesCategories: PropTypes.array.isRequired,
    handleImageChange: PropTypes.func.isRequired,
    setServiceData: PropTypes.func.isRequired,
    setImagePreviews : PropTypes.func.isRequired,
    setIsFormOpen: PropTypes.func.isRequired,
    imagePreviews: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    sub_categories:PropTypes.array.isRequired,
  };



