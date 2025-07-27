import { useState } from 'react'
import React from 'react'
import LoginPage from './Pages/loginPage'
import HomePage from './Pages/homePage'
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AdminHomepage from './Pages/admin/adminHomePage'
import { Links } from 'react-router-dom'



function App() {
  // const [count, setCount] = useState(0)
  return (
    <>
    <BrowserRouter>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
     <Toaster/>
      <Routes path ="/*">
        <Route path="/*" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/admin/*" element={<AdminHomepage />} />
      </Routes>
    </BrowserRouter>
  
    {/* <Testing /> */}

    {/* /* <UserData/> */ }
      {/* <ProductCart
        name="Red Sandalwood Cream"
        price="1200"
        image="https://www.biphaayurveda.com/cdn/shop/products/KeyBenefitsRedsandalwoodcream.jpg?v=1750160383&width=1445"
      />

      <ProductCart
        name="White Sandalwood Cream"
        price="1200"
        image="https://lk.spaceylon.com/cdn/shop/files/White_Sandal_Soothing_Eye_Serum_Set_-_Spa_Ceylon_Sri_Lanka-4367661.jpg?v=1728302453"
      /> */}
    </>
  );
}

export default App;
