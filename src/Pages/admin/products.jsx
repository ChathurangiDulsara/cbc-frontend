export default function Products(){


  getProducts()
  return (
    <div>
      <h1>Admin Product Page</h1>
    </div>
  )
}

async function getProducts(){
  const res = await axios.get("http://localhost:5000/api/products")
  console.log(res)
}