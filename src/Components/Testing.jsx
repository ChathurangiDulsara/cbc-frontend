import { useState } from "react"
import "./testing.css"
export default function Testing(){

  const [count,setCount] = useState(0)
  const [name,setName] = useState("Students")

  function increment(){
    setCount(count + 1)
  }
  function decrement(){
    setCount(count - 1)
  }

  function changeName(value){
    setName(value)
  }

  return(
    <>
    <div className="background">
        <button onClick={increment}>Increment</button>
        <span>{count}</span>
        <button onClick={decrement}>Decrement</button>
        
        </div>
    </>

  )
}
  