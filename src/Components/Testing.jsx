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
        <h1 className="text">Hello {name}</h1>
        <button className="val"onClick={increment}>Increment</button>
        <span>{count}</span>
        <button className="val" onClick={decrement}>Decrement</button>


        <div className="button-container">
            <button onClick={() => changeName("Students")}>Students</button>
            <button onClick={() => changeName("Teachers")}>Teachers</button>    
            <button onClick={() => changeName("Admins")}>Admins</button>
        </div>
        
        </div>
    </>

  )
}
  