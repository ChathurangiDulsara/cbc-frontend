import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProductNotFound from "./productNotFound";
import axios from "axios";

export default function ProductOverview(){

    const params = useParams();

    const productID= params.id;

    const[product,setProduct]=useState(null);
    const[status,setStatus]=useState("loading");


useEffect(() => {
    console.log(productID);
    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productID)
        .then(res => {
            if (res.data == null) {
                setStatus("not found");
            } else {
                setProduct(res.data);
                setStatus("found");
            }
        })
        .catch(err => {
            console.error("Axios error:", err);
            console.log("Error status:", err.response?.status);
            console.log("Error message:", err.message);
            setStatus("not found");
        });
}, []);

    return(

        <div className="w-full h-[calc(100vh-100px)]">
             <h1>Product Overview</h1>
            {
                status == "loading" &&(
                    <div className ="w-full h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-2 border-accent border-b-4"></div>
                    </div>
                )
            }
            {
                status == "not found" && <ProductNotFound/>
            }

            {
                status=="found"&&(
                    <div>
                        product Found
                    </div>
                )
            }
           
        </div>
    )
}