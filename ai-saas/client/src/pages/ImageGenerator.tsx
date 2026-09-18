import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageService } from '../services/imageService';
import { authService } from '../services/authService';

export default function ImageGenerator() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
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
    setImage(null);
    try {
      const response = await imageService.generate({ prompt });
      setImage(response.image);
    } catch (err: any) {
      if (err.error) {
        setError(err.error);
      } else if (err.prompt) {
        setError(`Prompt: ${err.prompt[0]}`);
      } else {
        setError('Failed to generate image.');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Image Generator</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image Prompt</label>
            <textarea 
              required
              rows={4}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="e.g. A futuristic city at night with neon lights"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mt-2 shadow-sm disabled:opacity-70"
          >
            {loading ? 'Generating Image...' : 'Generate Image'}
          </button>
        </form>
      </div>

      {image && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 self-start">Generated Result</h2>
          <img 
            src={image} 
            alt="Generated AI art" 
            className="rounded-lg shadow-md max-w-full h-auto"
          />
        </div>
      )}
    </div>
  )
}
