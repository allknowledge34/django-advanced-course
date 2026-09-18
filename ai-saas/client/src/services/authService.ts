const API_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

export const authService = {
  register: async (data: any) => {
    const response = await fetch(`${API_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw errorData;
    }
    return response.json();
  },

  login: async (data: any) => {
    const response = await fetch(`${API_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw errorData;
    }
    const result = await response.json();
    if (result.token) localStorage.setItem('token', result.token);
    if (result.refresh) localStorage.setItem('refresh', result.refresh);
    return result;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  },

  getMe: async (): Promise<any> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token');

    const response = await fetch(`${API_URL}/me/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      const refreshed = await authService.refreshToken();
      if (refreshed) {
        return authService.getMe();
      }
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  },

  refreshToken: async () => {
    authService.logout();
    return false;
  }
};
