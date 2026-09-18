import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleService } from '../services/articleService';
import { authService } from '../services/authService';

export default function ArticleGenerator() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [length, setLength] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [article, setArticle] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authService.getMe();
      } catch {
        navigate('/login');
      } finally {
        setAuthChecking(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setArticle(null);
    try {
      const response = await articleService.generate({ title, length });
      setArticle(response.article);
    } catch (err: any) {
      if (err.error) {
        setError(err.error);
      } else if (err.title) {
        setError(`Title: ${err.title[0]}`);
      } else if (err.length) {
        setError(`Length: ${err.length[0]}`);
      } else {
        setError('Failed to generate article.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authChecking) {
    return <div className="max-w-5xl mx-auto py-8 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Article Generator</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. The Future of Artificial Intelligence"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Approximate Length (words)</label>
            <input 
              type="number" 
              required
              min="100"
              max="5000"
              value={length}
              onChange={e => setLength(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mt-2 shadow-sm disabled:opacity-70"
          >
            {loading ? 'Generating...' : 'Generate Article'}
          </button>
        </form>
      </div>

      {article && (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
            {article}
          </div>
        </div>
      )}
    </div>
  )
}
