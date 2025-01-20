import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchSuggestions} from '../features/searchSlice';
import { suggestions } from '../services/api';
export default function SearchBar() {
  const [service, setService] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [newSuggestions, setnewSuggestions] = useState([]);
  const dispatch = useDispatch();
  const {Suggestions} = useSelector((state)=>state.search);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange=(e)=>{
    setService(e.target.value);
  } 

  useEffect(() => {
    console.log(service);
    if (service.length >= 5) {
      dispatch(fetchSuggestions(service)); // Trigger suggestions fetch

      if (Suggestions?.subCategories?.length > 0 || Suggestions?.services?.length > 0) {
        const filterSuggestions = [];

        Suggestions.subCategories.forEach(element => {
          filterSuggestions.push(element.name);
        });

        Suggestions.services.forEach(element => {
          filterSuggestions.push(element.title);
        });
        console.log(filterSuggestions);
        setnewSuggestions(filterSuggestions)
      }
    }
  }, [service, dispatch]); 
  

  return (
  <>
    <div className="search-bar-container d-flex ">
      <form onSubmit={handleSubmit} className="search-bar mb-1 d-flex align-items-center  rounded-pill overflow-hidden bg-white" style={{ minWidth: '45%' }}>
        <div className="d-flex align-items-center flex-grow-1 border-end px-3 py-2">
          <i className="fas fa-search text-primary me-2"></i>
          <input
            type="text"
            className="form-control border-0 bg-transparent shadow-none"
            placeholder="De quel service avez-vous besoin ?"
            value={service}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex align-items-center border-end px-3 py-2">
          <i className="fas fa-map-marker-alt text-primary me-2"></i>
          <input
            type="text"
            className="form-control border-0 bg-transparent shadow-none"
            placeholder="Code postal"
            style={{ width: '120px' }}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          className="btn  px-4 py-2 m-0 rounded-0 h-100 d-flex align-items-center"
          style={{ borderRadius: '0 50px 50px 0' }}
        >
          <i className="fas fa-search text-primary"></i>
        </button>
      </form>
      {
        service && newSuggestions.length > 0 &&(
        <div className='suggestion-dropdown p-4'>
            <ul>
              {
                newSuggestions.map((service , index)=>{
                    return<li key={index}><i className="fas fa-search  me-5"></i>{service}</li>
                })
              }
            </ul>
        </div>
        ) 
      }
      
    </div>
  </>
  );
}