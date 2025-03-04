import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../../styles/search.css";
import { fetchSuggestions } from '../../features/searchSlice';

export default function SearchBar() {
  const [service, setService] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [newSuggestions, setnewSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Suggestions } = useSelector((state) => state.search);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?service=${service}&zipcode=${zipcode}`);
  };

  const handleClick = (itemChose) => {
    setService(itemChose);
    if (itemChose && zipcode) {
      navigate(`/search?service=${itemChose}&zipcode=${zipcode}`);
    }
    setnewSuggestions([]);
  };

  const handleChange = (e) => {
    setService(e.target.value);
  };

  useEffect(() => {
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
        setnewSuggestions(filterSuggestions);
      }
    }
  }, [service, dispatch]);

  const token = localStorage.getItem('token');
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith('/search');

  return (
    <>
      <div className={token || isSearchPage ? "NavSearch" : "search-bar-container flex"}>
        <form onSubmit={handleSubmit} className="search-bar mb-1 flex items-center rounded-full overflow-hidden bg-white" style={{ minWidth: '45%' }}>
          <div className="flex items-center flex-grow border-r px-3 py-2">
            <i className="fas fa-search text-primary mr-2"></i>
            <input
              type="text"
              className="form-control border-0 bg-transparent shadow-none"
              placeholder="De quel service avez-vous besoin ?"
              value={service}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center border-r px-3 py-2">
            <i className="fas fa-map-marker-alt text-primary mr-2"></i>
            <input
              type="text"
              className="form-control border-0 bg-transparent shadow-none"
              placeholder="Code postal"
              style={{ width: '120px' }}
              value={zipcode}
              onChange={(e) => { setZipcode(e.target.value) }}
              required
            />
          </div>
          <button
            type="submit"
            className="btn px-4 py-2 m-0 rounded-0 h-full flex items-center"
            style={{ borderRadius: '0 50px 50px 0' }}
          >
            <i className="fas fa-search text-primary"></i>
          </button>
        </form>
        {
          service && newSuggestions?.length > 0 && !token && !isSearchPage && (
            <div className="suggestion-dropdown p-4">
              <ul>
                {
                  newSuggestions.map((iteme, index) => {
                    return <li key={index} onClick={() => { handleClick(iteme) }}><i className="fas fa-search mr-5"></i>{iteme}</li>;
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