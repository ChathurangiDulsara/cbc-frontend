import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../Components/header.jsx';
import ProductOverview from './Home/productInfo.jsx';
import LoginPage from './loginPage.jsx';
import Cart from './Home/cart.jsx';
import Product from './Home/products.jsx';
import { ContactPage } from './Home/contactUs.jsx';
import AboutUs from './Home/aboutUs.jsx';
import SignInPage from './signInPage.jsx';

export default function HomePage() {
  const navigate = useNavigate();

  function productsPage() {
    navigate("/Home/products");
  }

  function aboutUs() {
    navigate("/Home/aboutUs");
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-primary via-secondary/30 to-primary relative overflow-x-hidden'>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/30 rounded-full blur-xl animate-pulse"></div>
        
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-accent/20 rotate-45 rounded-sm animate-bounce"></div>
        <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-secondary/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-20 w-3 h-3 bg-accent/30 rotate-12 animate-bounce"></div>
      </div>

     
      <div className="relative z-10">
        <Header/>
      </div>

    
      <div className="relative z-10 w-full min-h-[calc(100vh-100px)]">
        <div className="container mx-auto px-4">
          <Routes>
          
            <Route 
              path="/" 
              element={
                <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">

                  <div className="text-center max-w-4xl mx-auto">
                
                    <div className="bg-primary/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border-2 border-secondary/50">
                      <div className="mb-8">
                        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent/20">
                          <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                          </svg>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-accent mb-4 leading-tight">
                          Welcome to Our
                        </h1>
                        <h2 className="text-4xl lg:text-5xl font-bold text-accent/80 mb-6">
                          Crystal Beauty Clear Store
                        </h2>
                        <div className="w-32 h-1 bg-accent rounded-full mx-auto mb-6"></div>
                      </div>

                      <p className="text-xl text-accent/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                        Discover premium beauty products that enhance your natural glow. 
                        From skincare essentials to makeup must-haves, we have everything you need.
                      </p>

  
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button 
                          className="bg-secondary hover:bg-accentLight text-accent font-bold py-4 px-8 rounded-xl transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl uppercase tracking-wider border-2 border-accent/20 focus:bg-accent focus:text-primary" 
                          onClick={productsPage}
                        >
                          Explore Products
                        </button>
                        <button 
                          className="bg-secondary hover:bg-accentLight text-accent font-bold py-4 px-8 rounded-xl transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl uppercase tracking-wider border-2 border-accent/20 focus:bg-accent focus:text-primary"
                          onClick={aboutUs}
                        >
                          Learn More
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 border border-accent/20">
                            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                            </svg>
                          </div>
                          <h3 className="font-bold text-accent mb-2">Premium Quality</h3>
                          <p className="text-accent/60 text-sm">Carefully selected products from trusted brands</p>
                        </div>

                        <div className="text-center">
                          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 border border-accent/20">
                            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                            </svg>
                          </div>
                          <h3 className="font-bold text-accent mb-2">Natural Ingredients</h3>
                          <p className="text-accent/60 text-sm">Gentle formulas with organic components</p>
                        </div>

                        <div className="text-center">
                          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 border border-accent/20">
                            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <h3 className="font-bold text-accent mb-2">Satisfaction Guaranteed</h3>
                          <p className="text-accent/60 text-sm">30-day return policy for your peace of mind</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } 
            />
            
    
            <Route path="/login" element={<LoginPage />} />
            <Route path="/productInfo/:id" element={<ProductOverview/>} />
            <Route path="/Home/cart" element={<Cart/>} />
            <Route path="/Home/products" element={<Product/>} />
            <Route path="/Home/contactUs" element={<ContactPage/>} />
            <Route path="/Home/aboutUs" element={<AboutUs/>} />
            <Route path="/Home/signInPage" element={<SignInPage/>}/>
          </Routes>
        </div>
      </div>

  
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 via-secondary/40 to-accent/20 z-10"></div>
      
  
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-2 h-32 bg-gradient-to-b from-transparent via-accent/20 to-transparent rounded-r-full"></div>
      <div className="fixed right-0 top-1/3 transform -translate-y-1/2 w-2 h-24 bg-gradient-to-b from-transparent via-secondary/30 to-transparent rounded-l-full"></div>
    </div>
  );
}
