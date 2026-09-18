const API_URL = import.meta.env.VITE_IMAGE_SERVICE_URL;

export const imageService = {
  generate: async (data: { prompt: string }) => {
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
