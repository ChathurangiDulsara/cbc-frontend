import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import uploadMediaToSupabase from "../../utils/mediaUpload.js";

export default function EditProductForm() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location)
 
  const product = location.state.product;

  const alternative_name = product.altNames.join(",")

  if(product==null){
    navigate("/admin/products")
  }
  
  const [productID, setProductID] = useState(product.productID);
  const [ProductName, setProductName] = useState(product.ProductName);
  const [altNames, setAlternativeNames] = useState(alternative_name);
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState(product.price);
  const [LastPrice, setLastPrice] = useState(product.LastPrice);
  const [stock, setStock] = useState(product.stock);
  const [description, setDescription] = useState(product.description);

  async function submitHandle(e) {
    e.preventDefault();

    const alternativeNames = altNames
      .split(",")
      .map(name => name.trim())
      .filter(Boolean);

    const promisesArray = [];

    let imgUrls = product.image

    if(imageFiles.length>0){
      for (let i = 0; i < imageFiles.length; i++) {
        promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
      }

      imgUrls = await Promise.all(promisesArray);
    }
    
    const ProductData = {
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
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/products/"+product.productID,
        ProductData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          }
        }
      );

      toast.success("Product Updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update product");
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Product</h1>
          <p className="text-gray-600">Update product information</p>
        </div>

        <form onSubmit={submitHandle} className="space-y-6">
          {/* Product ID */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Product ID</label>
            <input
              disabled
              type="text"
              placeholder="Product ID"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
              value={productID}
              onChange={(e) => { setProductID(e.target.value) }} 
            />
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
              value={ProductName}
              onChange={(e) => { setProductName(e.target.value) }}
            />
          </div>

          {/* Alternative Names */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Alternative Names</label>
            <input
              type="text"
              placeholder="Enter alternative names (comma-separated)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
              value={altNames}
              onChange={(e) => { setAlternativeNames(e.target.value) }}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Product Images</label>
            <div className="relative">
              <input
                type="file"
                className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-accent file:text-white file:cursor-pointer file:hover:bg-accent/90"
                onChange={(e) => {
                  setImageFiles(e.target.files)
                }}
                multiple
              />
            </div>
          </div>

          {/* Price Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Original Price</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Current Price</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
                value={LastPrice}
                onChange={(e) => { setLastPrice(e.target.value) }}
              />
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Stock Quantity</label>
            <input
              type="number"
              placeholder="0"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
              value={stock}
              onChange={(e) => { setStock(e.target.value) }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Product Description</label>
            <textarea
              placeholder="Enter product description..."
              className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 hover:border-gray-400"
              value={description}
              onChange={(e) => { setDescription(e.target.value) }}
            ></textarea>
          </div>

         
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
