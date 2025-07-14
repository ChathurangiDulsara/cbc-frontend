import axios from "axios";

export default function AdminProducts() {
  return (
    <div className='bg-white w-full h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold mb-4'>Admin Customers Page</h1>
      <p className='text-gray-600'>Manage your customers here.</p>
      {/* Add customer management features here */}
      {fetchProducts()}
    </div>
  );
}


function fetchProducts() {
  axios.get('http://localhost:5000/api/products')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the products!', error);
    });
}