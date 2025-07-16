import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaTrash, FaPen, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Products() {
  const [products, setProducts] = useState([])
  const [productsLoaded,setProductsLoaded] = useState(false)
  

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(
        (res) => {
          console.log(res.data)
          setProducts(res.data.list)
          setProductsLoaded(true)
        }
      )
      .catch(
        (err) => {
          console.error("Error fetching products:", err)
        }
      )
  }, [productsLoaded])

  return (
    <div className='min-h-screen bg-gray-100 p-6 relative'>
     
      <Link
        to="/admin/products/addProducts"
        className='absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-md'
        title='Add Product'
      >
        <FaPlus />
      </Link>

    
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Admin Product Page</h1>

      {
        productsLoaded?<div className="w-full h-full flex items-center justify-center ">
       <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-gray-200 text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Product ID</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Last Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product, index) => (
              <tr key={index + 1} className="hover:bg-gray-50">
                <td className="px-4 py-2">{product.productID}</td>
                <td className="px-4 py-2">{product.ProductName}</td>
                <td className="px-4 py-2">LKR{product.price}</td>
                <td className="px-4 py-2">LKR{product.LastPrice}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2 flex gap-3 justify-center text-blue-600">
                  <button
                    className="hover:text-red-500"
                    title="Delete"
                    onClick={async () => {
                       const confirmDelete = window.confirm(`Are you sure you want to delete "${product.ProductName}"?`);
                       if (!confirmDelete) return;

                              const token = localStorage.getItem("token");

                              try {
                                  const response = await axios.delete(`http://localhost:5000/api/products/${product.productID}`, {
                                     headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      });
 
                                    toast.success(response.data.message || "Product deleted successfully");
                                     setProductsLoaded(false); // Re-fetch product list
                                   } catch (err) {
                                              console.error("Error deleting product:", err.response?.data || err.message);
                                              toast.error(err.response?.data?.message || "Failed to delete product");
                                                 }
                                          }}

                  >
                    <FaTrash />
                  </button>
                  <button className="hover:text-red-500" title="Edit">
                    <FaPen />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      
      :<div className="w-[60px] h-[60px] flex flex-row items-center justify-center animate-spin border-b-[#3b82f6] rounded-full border-4 border-t-transparent relative top-[50%] left-[50%]  ">
        </div>
      }
    
    </div>
  )
}
