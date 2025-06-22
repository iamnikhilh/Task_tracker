// src/api/authService.js
import axios from 'axios';

const API_BASE = 'http://localhost:3001/api';

export async function loginUser(credentials) {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, credentials, {
      withCredentials: true, // needed only if backend sets cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Login request failed.';

    throw new Error(message);
  }
}
