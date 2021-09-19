import { logout } from "../services/authService";
import React, { useEffect } from "react";

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = () => {
  useEffect(() => {
    logout();
    window.location.href = "/";
  }, []);

  return null;
};

export default Logout;
