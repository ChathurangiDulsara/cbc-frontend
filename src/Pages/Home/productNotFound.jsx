import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductNotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-primary rounded-xl shadow-md p-8 mx-auto my-10 max-w-md border border-secondary text-secondary">
            <img
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                alt="Product not found"
                className="w-20 mb-6 opacity-70"
              
            />
            <h2 className="mb-3 font-semibold text-xl text-primary">Product Not Found</h2>
            <p className="text-base text-center text-accent">
                Sorry, we couldn't find the product you're looking for.<br />
                Please check the name or try searching again.
            </p>
            <button
                onClick={() => navigate('/')}
                className="mt-6 px-5 py-2 bg-accent text-white rounded hover:bg-accent transition"
            >
                Go Back to Homepage
            </button>
        </div>
    );
}
