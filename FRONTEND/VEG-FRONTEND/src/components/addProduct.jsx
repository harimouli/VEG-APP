import React, { useState } from "react";
import axios from "axios";
import "../App.css"
const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/admin/add/product", formData);
      alert("Product added!");
      setFormData({ name: "", price: "", description: "", imageUrl: "" });
    } catch (error) {
      console.error("Add product failed:", error);
      alert("Failed to add product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;