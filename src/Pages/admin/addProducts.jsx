import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload.js";

export default function AddProducts() {
  const [productID, setProductID] = useState("");
  const [ProductName, setProductName] = useState("");
  const [altNames, setAlternativeNames] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [LastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  async function submitHandle(e) {
    e.preventDefault();

    if (!productID || !ProductName || !price || !stock || !altNames || imageFiles.length === 0) {
      toast.error("Please fill in all required fields and select images");
      return;
    }

    const alternativeNames = altNames
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    const promisesArray = [];

    for (let i = 0; i < imageFiles.length; i++) {
      promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
    }

    const imgUrls = await Promise.all(promisesArray);
    console.log("Image URLs:", imgUrls);

    const product = {
      productID: productID.trim(),
      ProductName: ProductName.trim(),
      altNames: alternativeNames,
      image: imgUrls,
      price: Number(price),
      LastPrice: Number(LastPrice),
      stock: Number(stock),
      description: description.trim()
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      });

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Product</h1>
          <p className="text-gray-600">Create a new product listing</p>
        </div>

        <form onSubmit={submitHandle} className="space-y-6">
          {/* Product ID */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Product ID *</label>
            <input
              type="text"
              placeholder="Enter unique product ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
              value={productID}
              onChange={(e) => {
                setProductID(e.target.value);
              }}
            />
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Product Name *</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
              value={ProductName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>

          {/* Alternative Names */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Alternative Names *</label>
            <input
              type="text"
              placeholder="Enter alternative names (comma-separated)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
              value={altNames}
              onChange={(e) => {
                setAlternativeNames(e.target.value);
              }}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Product Images *</label>
            <div className="relative">
              <input
                type="file"
                className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-accent file:text-white file:cursor-pointer file:hover:bg-accent/90"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setImageFiles(files);
                }}
                multiple
              />
            </div>
          </div>

          {/* Price Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Original Price *</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Current Price</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
                value={LastPrice}
                onChange={(e) => {
                  setLastPrice(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Stock Quantity *</label>
            <input
              type="number"
              placeholder="0"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Product Description</label>
            <textarea
              placeholder="Enter product description..."
              className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>

         
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
