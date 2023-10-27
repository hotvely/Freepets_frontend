import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userLogout } from "../../components/store/userSlice";
import { useDispatch } from "react-redux";
import { deleteTokenCookie } from "../../api/cookie";

const Logout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    deleteTokenCookie();
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
