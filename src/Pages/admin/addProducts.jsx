import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function AddProducts() {
  const [productID, setProductID] = useState("");
  const [ProductName, setProductName] = useState("");
  const [altNames, setAlternativeNames] = useState("");
  // const [images, setimages] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState("");
  const [LastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate()

  async function submitHandle(e) {
    e.preventDefault();

    const alternativeNames = altNames
      .split(",")
      .map(name => name.trim())
      .filter(Boolean);

    // const images = images
    //   .split(",")
    //   .map(url => url.trim())
    //   .filter(Boolean);

    const promisesArray = []

    for (let i = 0; i < imageFiles.length; i++) {
      promisesArray[i] = uploadMediaToSupabase(imageFiles[i])
    }

    const imgUrls = Promise.all(promisesArray)

    const Product = {
      productID: productID.trim(),
      ProductName: ProductName.trim(),
      altNames: alternativeNames,
      images: imgUrls,
      price: Number(price),
      LastPrice: Number(LastPrice),
      stock: Number(stock),
      description: description.trim()
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/products", Product, {
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
    <div className="w-full min-h-screen bg-blue-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-8">Add New Product</h1>



        <div>
          <label className="block text-sm font-medium mb-1">Product ID</label>
          <input
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


        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            onClick={submitHandle}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
