import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();
  const handled = useRef(false);
  useEffect(() => {
    if (handled.current) return;
    handled.current = true;
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      console.log("no token found!");
      navigate("/");
    }
  }, []);

  return (
    <>
      <p>Logging you in...</p>
    </>
  )
}