import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userLogout } from "../../components/store/userSlice";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userLogout());
  };

  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/");
  }, []);
  return null;
};

export default Logout;
