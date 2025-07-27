import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutUs() {
    
    const navigate = useNavigate();

   function productsPage(){
    navigate("/Home/products");
  }
   

    return (
        <div className="min-h-screen bg-primary">
           
            <div className="bg-accent text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">About Crystal Clear Beauty</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Discover the beauty within you with our premium collection of skincare,
                        cosmetics, and wellness products that bring out your natural radiance.
                    </p>
                </div>
            </div>

            
            <section className="py-16 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Founded in 2020, Crystal Clear Beauty Store began as a dream to make
                                premium beauty products accessible to everyone. What started as a small
                                online boutique has grown into a trusted destination for beauty enthusiasts
                                worldwide.
                            </p>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                We believe that true beauty comes from feeling confident in your own skin.
                                That's why we carefully curate every product in our collection, ensuring
                                they meet our high standards for quality, effectiveness, and safety.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our mission is simple: to help you discover and embrace your unique beauty
                                with products that deliver real results and make you feel amazing every day.
                            </p>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80"
                                alt="Beauty products"
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="py-16 bg-primary">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-secondary p-8 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality First</h3>
                            <p className="text-gray-600">
                                We source only the finest ingredients and work with trusted brands
                                to ensure every product meets our rigorous quality standards.
                            </p>
                        </div>

                        <div className="bg-secondary p-8 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Customer Satisfaction</h3>
                            <p className="text-gray-600">
                                Your happiness is our priority. We're committed to providing
                                exceptional service and ensuring you love every purchase.
                            </p>
                        </div>

                        <div className="bg-secondary p-8 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Sustainability</h3>
                            <p className="text-gray-600">
                                We're committed to eco-friendly practices and supporting brands
                                that prioritize environmental responsibility.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-secondary">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Crystal Clear Beauty?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Premium Products</h3>
                            <p className="text-gray-600 text-sm">Carefully curated selection of high-quality beauty products</p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Best Prices</h3>
                            <p className="text-gray-600 text-sm">Competitive pricing with regular discounts and offers</p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6.001"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast Shipping</h3>
                            <p className="text-gray-600 text-sm">Quick and secure delivery to your doorstep</p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Support</h3>
                            <p className="text-gray-600 text-sm">Professional beauty consultations and customer support</p>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="py-16 bg-accent text-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-4xl font-bold mb-2">10,000+</h3>
                            <p className="text-xl">Happy Customers</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold mb-2">500+</h3>
                            <p className="text-xl">Premium Products</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold mb-2">50+</h3>
                            <p className="text-xl">Trusted Brands</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold mb-2">99%</h3>
                            <p className="text-xl">Satisfaction Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-primary">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-secondary rounded-lg shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1494790108755-2616c0763c52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                                alt="Sarah Johnson"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sarah Johnson</h3>
                                <p className="text-accent mb-3">Founder & CEO</p>
                                <p className="text-gray-600 text-sm">
                                    Beauty industry veteran with 15+ years of experience in product development and retail.
                                </p>
                            </div>
                        </div>

                        <div className="bg-secondary rounded-lg shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80"
                                alt="Emily Chen"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Emily Chen</h3>
                                <p className="text-accent mb-3">Head of Product Curation</p>
                                <p className="text-gray-600 text-sm">
                                    Licensed esthetician and skincare expert who personally tests every product we carry.
                                </p>
                            </div>
                        </div>

                        <div className="bg-secondary rounded-lg shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80"
                                alt="Maria Rodriguez"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Maria Rodriguez</h3>
                                <p className="text-accent mb-3">Customer Experience Manager</p>
                                <p className="text-gray-600 text-sm">
                                    Dedicated to ensuring every customer has an exceptional shopping experience with us.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="py-16 bg-secondary">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Discover Your Beauty?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust Crystal Clear Beauty for their skincare and cosmetic needs.
                    </p>
                    <button className="bg-accent hover:bg-accent-light text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105" onClick={productsPage}>
                        Shop Now
                    </button>
                </div>
            </section>

            <section className="py-12 bg-gray-800 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Visit Our Store</h3>
                            <p className="text-gray-300">123 Beauty Lane<br />Fashion District<br />New York, NY 10001</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                            <p className="text-gray-300">Phone: (555) 123-4567<br />Email: hello@crystalclearbeauty.com</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Store Hours</h3>
                            <p className="text-gray-300">Monday - Saturday: 9AM - 8PM<br />Sunday: 10AM - 6PM</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
