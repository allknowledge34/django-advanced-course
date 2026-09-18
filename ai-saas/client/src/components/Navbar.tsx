import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function Navbar() {
  useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-6xl flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight">AI SaaS</Link>
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium transition-colors">Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-md font-medium transition-colors border border-transparent"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium transition-colors">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors shadow-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
