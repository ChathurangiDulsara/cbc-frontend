import { useState } from 'react'
import React from 'react'
import './App.css'
import ProductCart from './Components/ProductCart'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <ProductCart
        name="Red Sandalwood Cream"
        price="1200"
        image="https://www.biphaayurveda.com/cdn/shop/products/KeyBenefitsRedsandalwoodcream.jpg?v=1750160383&width=1445"
      />

      <ProductCart
        name="White Sandalwood Cream"
        price="1200"
        image="https://lk.spaceylon.com/cdn/shop/files/White_Sandal_Soothing_Eye_Serum_Set_-_Spa_Ceylon_Sri_Lanka-4367661.jpg?v=1728302453"
      />
    </>
  );
}

export default App;
