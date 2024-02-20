"use client";
import { useState } from "react";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    rating: 0,
    comment: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <h3>Add a Review</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          value={formData.rating}
          onChange={handleChange}
          required
          min="1"
        />
        <label htmlFor="comment">Comment:</label>
        <textarea value={formData.comment} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
