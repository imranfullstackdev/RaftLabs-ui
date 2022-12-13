import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
const Logout = () => {
  const navigate = useNavigate();
  const logoutFunc = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    alert('Loging out Sucessfully')
    logoutFunc();
  }, []);
  return (
   <></>
  );
};

export default Logout;
