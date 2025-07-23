import axios from "axios";
import { useState } from "react"
import { useEffect } from "react"
import ProductCard from "../../Components/ProductCart";

export default function(){

    const [products,setProducts]= useState([]);
    const [LoadingState,setLoadingState] =useState("loading");


    useEffect(
        ()=>{
            if(LoadingState=="loading"){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                (res)=>{
                    console.log(res.data)
                    setProducts(res.data.list)
                    setLoadingState(res.data)
                }
            ).catch(
                (e)=>{
                toast.error(" Failed to Fetch Products"+e)
                }
            )
        }
        },[]
        )

    return(
        <div className="w-full h-full bg-secondary flex flex-wrap overflow-y-scroll">
            {
                products.map(
                    (product)=>
                        <ProductCard product={product}/>
                        // <div key={product.productID} className ="flex flex-row items-center">
                        //     <img src={product.image} alt={product.ProductName} className="h-40 w-40 object-cover"/>
                        //     <h1>{product.ProductName}</h1>
                        //     <p>{product.description}</p>
                        //     <p>LKR{product.price}</p>

                        // </div>
                )
              
            }
            
        </div>
    )
}