import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function EditProductForm() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location)
 
  const product = location.state.product;

  const alternative_name =product.altNames.join(",")


  if(product==null){
    navigate("/admin/products")

  }
  const [productID, setProductID] = useState(product.productID);
  const [ProductName, setProductName] = useState(product.ProductName);
  const [altNames, setAlternativeNames] = useState(alternative_name);
  // const [images, setimages] = useState("");
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
    <div className="w-full  bg-secondary flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Products Form</h1>

        <form onSubmit={submitHandle}>
          <div>
            <label className="block text-sm font-medium mb-1">Product ID</label>
            <input
              disabled
              type="text"
              placeholder="Product ID"
              className="w-full p-2 border border-gray-300 rounded"
              value={productID}
              onChange={(e) => { setProductID(e.target.value) }} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              className="w-full p-2 border border-gray-300 rounded"
              value={ProductName}
              onChange={(e) => { setProductName(e.target.value) }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Alternative Names</label>
            <input
              type="text"
              placeholder="Alternative Names"
              className="w-full p-2 border border-gray-300 rounded"
              value={altNames}
              onChange={(e) => { setAlternativeNames(e.target.value) }}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Image URLs</label>
            <input
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter Image URLs (comma-separated)"
              onChange={(e) => {
                setImageFiles(e.target.files)
              }}
              multiple
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              placeholder="Price"
              className="w-full p-2 border border-gray-300 rounded"
              value={price}
              onChange={(e) => { setPrice(e.target.value) }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Price</label>
            <input
              type="number"
              placeholder="Last Price"
              className="w-full p-2 border border-gray-300 rounded"
              value={LastPrice}
              onChange={(e) => { setLastPrice(e.target.value) }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              placeholder="Stock"
              className="w-full p-2 border border-gray-300 rounded"
              value={stock}
              onChange={(e) => { setStock(e.target.value) }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              placeholder="Product Description"
              className="w-full p-2 border border-gray-300 rounded h-24 resize-none"
              value={description}
              onChange={(e) => { setDescription(e.target.value) }}
            ></textarea>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
}