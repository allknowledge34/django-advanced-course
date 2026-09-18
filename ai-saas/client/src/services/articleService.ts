const API_URL = import.meta.env.VITE_ARTICLE_SERVICE_URL;

export const articleService = {
  generate: async (data: { title: string; length: number }) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/generate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw errorData;
    }
    return response.json();
  }
};
