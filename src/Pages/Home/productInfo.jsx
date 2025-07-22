import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
import axios from "axios";
import ImageSlider from "../../Components/imageSlider";
import { addToCart } from "../../utils/cartFunction";
import Loading from "../../Components/loading";

export default function ProductOverview() {
  const { id: productID } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productID}`)
      .then((res) => {
        if (!res.data) {
          setStatus("not found");
        }else {
          console.log(res.data.product);
          setProduct(res.data.product);
          setStatus("found");
        }
      })
      .catch((err) => {
        console.error("Axios error:", err);
        setStatus("not found");
      });
  }, []);
   function onAddtoCartClick() {
      addToCart(product.productId, 1);
      toast.success(product.productId + " Added to cart");
    }
  
    function onBuyNowClick(){
      navigate("/shipping",{
        state:{
          items: [
            {
              productId: product.productId,
              qty: 1
            }
          ]
        }
      })
    }

  if (status === "loading") return <Loading />;
  if (status === "not found") return <ProductNotFound />;

  return (
    <div className="w-full h-[calc(100vh-100px)] p-4">
      <h1 className="text-2xl font-semibold mb-4">Product Overview</h1>

      {status === "found" && product && (
        <div className="w-full h-full flex items-start justify-center gap-4">
          
          <div className="w-[35%]">
            {Array.isArray(product.image) && product.image.length > 0 ? (
             <ImageSlider images={product.image} />
            ) : (
              <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg">
                No images available
              </div>
            )}
          </div>

          <div className="w-[65%] p-4">
            <h2 className="text-3xl font-bold text-accent mb-2">{product.ProductName}</h2>

            {Array.isArray(product.altNames) && product.altNames.length > 0 && (
              <h3 className="text-xl text-accent mb-2">
                {product.altNames.join(" | ")}
              </h3>
            )}

            <p className="text-xl text-accent mb-2">
              {product.price > product.LastPrice && (
                <span className="line-through font-bold text-lg mr-2">
                  LKR {product.price}
                </span>
              )}
              <span className="font-bold text-lg">LKR {product.LastPrice}</span>
            </p>


			<br></br>

            <p className="text-lg text-accent">{product.description}</p>

            <button
              onClick={onAddtoCartClick}
              className="bg-accent text-white p-2 rounded-lg"
            >
              Add to cart
            </button>
            <button
              onClick={onBuyNowClick}
              className=" text-accent border mx-1 border-accent p-2 rounded-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
