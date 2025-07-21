import { Link, Routes,Route } from 'react-router-dom';
import React from 'react';
import Header from '../Components/header.jsx';
import ProductOverview from './Home/productInfo.jsx';

export default function HomePage() {
  return (
    <div className=' w-full h-screen bg-secondary display relative'>
      <Header/>
      <div className=" w-full h-[cal(100vh-100px)]">
        <Routes path="/">
        <Route path="/"> element {<h1><HomePage/></h1>}/</Route>
        <Route path ="/login" element={<h1><LoginPage/></h1>}></Route>
         <Route path ="/productInfo" element={<h1><ProductOverview/></h1>}></Route>
      
      
      
      
      
      
      </Routes>
      </div>
      
    </div>
  );
}
