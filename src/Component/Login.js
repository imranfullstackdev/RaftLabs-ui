import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userLogin, setuserLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  //  email, password,
  const changeHandler = (e) => {
    setuserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userLogin.email || !userLogin.password) {
      toast.warn("DATA NOT FILLED PROPERLY", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const LoginUser = await fetch("https://raft-labs-api.vercel.app/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLogin),
        });
        const res = await LoginUser.json();
        localStorage.setItem("Token", res.token);
        toast.success(res.mess, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/ViewBooks");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className=" container h-100 mt-5 d-flex align-items-center justify-content-center border-2 w-auto text-light">
        <Form onSubmit={submitHandler} className="HomeForm">
          <h3 className="">
            <u>
              <b>LOGIN</b>
            </u>
          </h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <b>Email Address:</b>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={userLogin.email}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <b>Password:</b>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={userLogin.password}
              onChange={changeHandler}
            />
          </Form.Group>

          <Button type="submit" style={{ backgroundColor: "#fc5101" }}>
            Submit
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
