import React, { useState } from "react";

export default function SidebarSearch() {
  const [filterData, setFilterData] = useState({
    price: { minPrice: 0, maxPrice: 0 },
    gender: "",
  });
  console.log(filterData);
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

  // Handle form submission
  const handleSubmit = () => {
    console.log("Filters applied:", filterData);
    // Dispatch filter data to Redux or API request
  };

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
      <button className="mt-4 btn btn-primary mx-4" onClick={handleSubmit}>
        Filtrez vos choix
      </button>
    </div>
  );
}
