import React, { useState } from 'react';
import toast from 'react-hot-toast';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Thank you for your inquiry! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/download.jpeg"
                alt="Beauty product demonstration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent"></div>
            </div>
          
            {/* Decorative elements with custom colors */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full opacity-80"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary rounded-full opacity-60 shadow-lg"></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-accent/10 rounded-full opacity-70"></div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 lg:p-12 border border-secondary/30">
            {/* Header */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 flex items-center">
                <span className="w-8 h-px bg-accent mr-3"></span>
                INFORMATION ABOUT US
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                CONTACT US FOR ANY QUESTIONS
              </h1>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition duration-200 bg-primary hover:bg-white"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition duration-200 bg-primary hover:bg-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Phone and Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition duration-200 bg-primary hover:bg-white"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition duration-200 bg-primary hover:bg-white"
                    placeholder="Enter your company"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition duration-200 bg-primary hover:bg-white resize-none"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-accent text-white px-8 py-3 rounded-lg font-medium uppercase tracking-wider hover:bg-accent/90 transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl border-2 border-accent hover:border-accent/80"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
