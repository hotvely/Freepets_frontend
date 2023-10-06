import { useNavigate } from "react-router-dom";
import { logoutAPI } from "../../api/auth";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    logoutAPI();
    navigate("/");
  }, []);
  return null;
};

export default Logout;
