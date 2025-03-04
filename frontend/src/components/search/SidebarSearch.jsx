import React, { useState } from "react";
import {useDispatch} from "react-redux";
import { useLocation } from "react-router-dom";
import {fetchResults} from "../../features/searchSlice"
export default function SidebarSearch() {
  const [filterData, setFilterData] = useState({
    price: { minPrice: 0, maxPrice: 0 },
    gender: "",
  });
  const dispatch = useDispatch();
  // Handle price changes
  const handlePrice = (e) => {
    const { name, value } = e.target;
    setFilterData((prevFilter) => ({
      ...prevFilter,
      price: {
        ...prevFilter.price,
        [name]: value,
      },
    }));
  };

  // Handle gender selection
  const handleChange = (e) => {
    setFilterData((prevFilter) => ({
      ...prevFilter,
      gender: e.target.value,
    }));
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("service");
  const zipcode = searchParams.get("zipcode");
  // Handle form submission
  const handleSubmit = () => {
      const {gender , price } = filterData 
      if(gender || price.minPrice > 0 || price.maxPrice >0){
        dispatch(fetchResults({filterData , query , zipcode}))
      }else {
        alert("entrer le filter formes");
      }
  };

  const handleResetFilters =()=>{
    setFilterData({ 
      price: { minPrice: 0, maxPrice: 0 },
      gender: "",
    })
  }

  return (
    <div>
      <h1>Filter Services</h1>

      {/* Price Filter */}
      <div className="d-flex flex-column gap-2 mb-4">
        <p className="mb-0 fw-bold border p-2 text-center rounded-pill">Prix:</p>
        <input
          type="number"
          className="form-control"
          name="minPrice"
          placeholder="Min price"
          value={filterData.price.minPrice} // Controlled input
          onChange={handlePrice}
        />
        <input
          type="number"
          className="form-control"
          name="maxPrice"
          placeholder="Max price"
          value={filterData.price.maxPrice} // Controlled input
          onChange={handlePrice}
        />
      </div>

      {/* Gender Filter */}
      <div className="d-flex flex-column">
        <p className="mb-2 fw-bold border p-2 text-center rounded-pill">Genre</p>
        {["male", "female", "mix"].map((option) => (
          <div className="form-check" key={option}>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id={option}
              value={option}
              checked={filterData.gender === option} // Controlled input
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={option}>
              {option === "male" ? "Hommes" : option === "female" ? "Femmes" : "Peu importe"}
            </label>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button className="mt-4 btn btn-primary " onClick={handleSubmit}>
        Filtrez vos choix
      </button>
      <button className="mt-4 btn btn-primary px-4" onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
}
