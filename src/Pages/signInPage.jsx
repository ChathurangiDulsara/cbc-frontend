import { Link } from 'react-router-dom';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#FAF7F3' }}>
      <div className="w-full max-w-md p-8 rounded-lg shadow-md" style={{ backgroundColor: '#F0E4D3' }}>
        <h2 className="text-2xl font-bold text-center" style={{ color: '#c8611d' }}>
          Crystal Beauty Clear - Sign In
        </h2>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium" style={{ color: '#c8611d' }}>
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2"
              style={{ 
                borderColor: '#c8611d',
                focusRingColor: '#c8611d',
                backgroundColor: '#FAF7F3'
              }}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium" style={{ color: '#c8611d' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-2"
              style={{ 
                borderColor: '#c8611d',
                focusRingColor: '#c8611d',
                backgroundColor: '#FAF7F3'
              }}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded focus:ring-2"
                style={{ 
                  accentColor: '#c8611d',
                  borderColor: '#c8611d'
                }}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm" style={{ color: '#c8611d' }}>
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link 
                to="/forgot-password" 
                className="font-medium hover:underline"
                style={{ color: '#c8611d' }}
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
            style={{ 
              backgroundColor: '#c8611d',
              focusRingColor: '#c8611d'
            }}
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: '#c8611d' }}>
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="font-medium hover:underline"
            style={{ color: '#c8611d' }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
