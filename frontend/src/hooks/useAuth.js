import { useState, useEffect } from 'react';

function decodeJwtPayload(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const normalized = decodeURIComponent(
      atob(padded)
        .split("")
        .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join("")
    );

    return JSON.parse(normalized);
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJwtPayload(token);
      if (decoded) {
        setUser(decoded);
      } else {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, loading, login, logout };
}