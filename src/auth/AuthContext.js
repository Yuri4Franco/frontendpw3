import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user_id = localStorage.getItem('usuario_id');
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('admin') === 'true';

    if (user_id && token) {
      setUser({ user_id, token, isAdmin });
    }
  }, []);

  const login = (user_id, token, isAdmin) => {
    localStorage.setItem('usuario_id', user_id);
    localStorage.setItem('token', token);
    localStorage.setItem('admin', isAdmin);
    setUser({ user_id, token, isAdmin });
  };

  const logout = () => {
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
