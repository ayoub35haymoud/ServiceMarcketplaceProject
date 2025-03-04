import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation , useNavigate} from "react-router-dom";
import { fetchResults } from "../features/searchSlice";
import SkeletonProfile from "../components/Skeletons/SkeletonProfile";
import '../styles/Search.css'
import SidebarSearch from "../components/search/SidebarSearch";
export default function Search() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, error, searchResults } = useSelector((state) => state.search);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("service");
  const zipcode = searchParams.get("zipcode");

  useEffect(() => {
    dispatch(fetchResults({ query, zipcode, page: currentPage }));
  }, [dispatch, query, zipcode, currentPage]);

  const handleNextPage = () => {
    if (searchResults.next_page_url) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (searchResults.prev_page_url && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  //handle the navigation for the next page 
  const handleNaviBookPage = (id) => {
    navigate(`/booking/${id}` , {replace : true});
  };

  console.log(searchResults);
  return (
    <div className={!loading ? "contFather" : ""}>
      {loading && !searchResults.data &&(
          <div className="skeletonSearch ">
            <p>Chargement des résultats...</p>
            <SkeletonProfile />
            <SkeletonProfile />
            <SkeletonProfile />
          </div>
      )}
      {error && <p className="text-red-500">Une erreur s est produite: {error}</p>}
      <div className="sidebar-filter">
        {/* css exist in file serch.css */}
        { searchResults.data && <SidebarSearch/>}
      </div>
      <div className="container1 pt-4">
        {!loading &&
          searchResults.data &&
          searchResults.data.map((result) => (
            <div className="card-container" key={result.id} >
              <div className="d-flex align-items-start gap-4">
                  {/* Logo Section */}
                  <div className="company-logo d-flex align-items-center justify-content-center">
                    <img src={result?.user.profile?.profile_picture} alt={result.title} />
                  </div>
      
                  {/* Main Content Section */}
                  <div className="flex-grow-1">
                    <h2 className="h4 mb-2">{result.title}</h2>
                    
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div className="d-flex align-items-center verified-badge">
                        <svg className="bi bi-patch-check-fill me-1" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636z"/>
                        </svg>
                        <span>Top Pro</span>
                      </div>
                      <span className="star-rating">★★★★★</span>
                      <span>Exceptional 5.2 253</span>
                    </div>
      
                    <div className="value-badge mb-3">Great value</div>
                      <p className="text-secondary mt-3 mb-0 description-text">
                        {result.description}
                        <button className="btn btn-link btn-sm text-decoration-none p-0 ms-1">...See more</button>
                      </p>
                    </div>
      
                    {/* Price Section */}
                    <div className="price-section">
                      <div className="mb-3">
                        <div className="h4 mb-0">{result.price}</div>
                        <div className="starting-price">Starting price</div>
                      </div>
                      <button className="view-profile-btn" onClick={()=>{handleNaviBookPage(result.id)}}>View Profile</button>
                    </div>

              </div>
            </div>
          ))}
          {!loading && searchResults.data && searchResults.data.length > 0 && (
              <div className="flex justify-center items-center mt-6 space-x-4 text-center">
                <button
                  onClick={handlePrevPage}
                  disabled={!searchResults.prev_page_url || currentPage === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                  Précédent
                </button>
                <span>Page {currentPage}</span>
                <button
                  onClick={handleNextPage}
                  disabled={!searchResults.next_page_url}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
           )}
      </div>
      {!loading && searchResults.data && searchResults.data.length === 0 && (
        <p className="text-gray-500 text-center">Aucun résultat trouvé.</p>
      )}
    </div>
  );
}