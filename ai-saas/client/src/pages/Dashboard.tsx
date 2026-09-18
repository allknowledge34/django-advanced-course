import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getMe();
        setUser(userData);
      } catch {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  if (loading) {
    return <div className="max-w-5xl mx-auto py-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-2">AI Article Generator</h2>
          <p className="text-gray-600 mb-6 flex-grow">Create high-quality, professional articles on any topic instantly.</p>
          <button onClick={() => navigate('/article-generator')} className="w-full bg-indigo-50 text-indigo-700 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition-colors">
            Generate Article
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-2">AI Image Generator</h2>
          <p className="text-gray-600 mb-6 flex-grow">Transform your text descriptions into stunning visual artwork.</p>
          <button onClick={() => navigate('/image-generator')} className="w-full bg-indigo-50 text-indigo-700 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition-colors">
            Generate Image
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 flex flex-col opacity-75">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-gray-700">Resume Analyzer</h2>
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">Upcoming</span>
          </div>
          <p className="text-gray-500 mb-6 flex-grow">Get actionable feedback on your resume using AI analysis.</p>
          <button disabled className="w-full bg-gray-200 text-gray-500 py-2 rounded-lg font-semibold cursor-not-allowed">
            Coming Soon
          </button>
        </div>

      </div>
    </div>
  )
}
