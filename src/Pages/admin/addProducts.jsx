import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [productID, setProductID] = useState("");
  const [ProductName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  

  const navigate = useNavigate()

 async function submitHandler() {

  const altNames= alternativeNames.split(",");
  const imgurl = imageUrls.split(",");

  const product ={
    productID: productID,
    productName: ProductName,
    alternativeNames: altNames,
    imageUrls: imgurl,
    price: price,
    lastPrice: lastPrice,
    stock: stock,
    description: description
  }
   const token = localStorage.getItem("token");

   try{
     await axios.post("http://localhost:5000/api/products", product, {
        headers: {
          Authorization: "Bearer" +token
        }
        });
        navigate("/admin/products")
        toast.success("Product added successfully");
  
      } catch (err) {
        console.error("Error adding product:", err);
        toast.error("Failed to add product");
      }
      

}

  return (
    <div className="w-full min-h-screen bg-blue-300 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-8">Add New Product</h1>

        <form className="space-y-6">
          {/* Product ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Product ID</label>
            <input
              type="text"
              placeholder="Product ID"
              className="w-full p-2 border border-gray-300 rounded"
              value={productID}
              onChange={(e)=>{setProductID(e.target.value)}}      />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              className="w-full p-2 border border-gray-300 rounded"
              value={ProductName}
              onChange={(e)=>{setProductName(e.target.value)}} 
            />
          </div>

          {/* Alternative Names */}
          <div>
            <label className="block text-sm font-medium mb-1">Alternative Names</label>
            <input
              type="text"
              placeholder="Alternative Names"
              className="w-full p-2 border border-gray-300 rounded"
              value={alternativeNames}
              onChange={(e)=>{setAlternativeNames(e.target.value)}} 
            />
          </div>

          {/* Image URLs */}
          <div>
            <label className="block text-sm font-medium mb-1">Image URLs</label>
            <input
              type="text"
              placeholder="Image URLs"
              className="w-full p-2 border border-gray-300 rounded"
              value={imageUrls}
              onChange={(e)=>{setImageUrls(e.target.value)}} 
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              placeholder="Price"
              className="w-full p-2 border border-gray-300 rounded"
              value={price}
              onChange={(e)=>{setPrice(e.target.value)}}  
            />
          </div>

          {/* Last Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Last Price</label>
            <input
              type="number"
              placeholder="Last Price"
              className="w-full p-2 border border-gray-300 rounded"
              value={lastPrice}
              onChange={(e)=>{setLastPrice(e.target.value)}}
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              placeholder="Stock"
              className="w-full p-2 border border-gray-300 rounded"
              value={stock}
              onChange={(e)=>{setStock(e.target.value)}}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              placeholder="Product Description"
              className="w-full p-2 border border-gray-300 rounded h-24 resize-none"
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}  
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
              onClick={submitHandler}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
