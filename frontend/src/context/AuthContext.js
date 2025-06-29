import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import csrfAxios from '../api/csrfAxios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  // const login = async (email, password) => {
  //   const res = await api.post('/login', { email, password });
  //   localStorage.setItem('token', res.data.token);
  //   setUser(res.data.user);
  // };

  const login = async (email, password) => {
    await csrfAxios.get('/sanctum/csrf-cookie');
    const res = await api.post('/login', { email, password });
    localStorage.setItem('token', res.data.token);
    await fetchUser();  // must call this to set user!
  };


  const logout = async () => {
    await api.post('/logout', {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    localStorage.removeItem('token');
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const res = await api.get('/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
