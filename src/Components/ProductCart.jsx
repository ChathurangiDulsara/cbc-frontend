
export default function ProductCart({ name, price, image }) {
  return (
    <div>
      <h2>Product: {name}</h2>
      <h2>Price: LKR{price}</h2>
      <img src={image} alt={name} style={{ width: '200px' }} />
      <br />
      <button>Add to Cart</button>
      <button>Remove from Cart</button>  
    </div>
  );
}
