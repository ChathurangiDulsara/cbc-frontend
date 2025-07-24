import { Link } from "react-router-dom"

export default function ProductCard(props) {

  console.log(props)

  return (
    <Link to={`/productInfo/${props.product.productID}`} className="w-[300px] h-[450px] m-[70px]  rounded-xl shadow-lg shadow-gray-500 hover:shadow-primary  hover:border-[3px] overflow-hidden flex flex-col">

      <img src={props.product.image[0]} className="h-[60%] w-full object-cover" />
      <div className=" max-h-[40%] h-[35%] p-4 flex flex-col justify-between">
        <h1 className="text-xl font-bold text-accent text-center font-mono">{props.product.ProductName}</h1>
        <h2 className="text-lg text-gray-500 text-center">{props.product.productID}</h2>
        <p className=" text-xl font-semibold text-gray-950 text-center font-mono">LKR. {props.product.LastPrice.toFixed(2)}</p>
        {props.product.price> props.product.LastPrice && (
          <p className="text-xl text-[#c8611d] font-bold line-through font-mono text-center">
            LKR. {props.product.price.toFixed(2)}
          </p>
        )}




      </div>

    </Link>
  )
}

