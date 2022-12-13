import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AddBooks = () => {
  // name;
  // email;
  // password;
  // dish;
  const [pdf, setpdf] = useState({
    name: "",
    email: "",
    password: "",
    Book: "",
    Bookname: "",
    Authername: "",
  });
  const [pdfUpload, setpdfUpload] = useState();
  const [pdfUploadName, setpdfUploadName] = useState("");
  const navigate = useNavigate();
  // name, email, password, Cpassword, mobile
  const changeHandler = (e) => {
    setpdf({ ...pdf, [e.target.name]: e.target.value });
  };
  const selectHandler = (e) => {
    setpdfUpload(e.target.files[0]);
    setpdfUploadName(e.target.files[0].name);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !pdf.name ||
      !pdf.email ||
      !pdf.password ||
      !pdf.Book ||
      !pdf.Bookname ||
      !pdf.Authername
    ) {
      toast.error("Please enter All The details", {
        position: "top-center",
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
        // if pdfUpload exist
        if (pdfUpload) {
          // if pdfUpload is of different type
          if (
            pdfUpload.type === "text/csv" ||
            pdfUpload.type === "application/pdf"
          ) {
            // validating pdfUpload size
            if (pdfUpload.size <= 1023800000000) {
              // if everey thing goes well
              let { body } = pdf;
              e.preventDefault();
              localStorage.setItem("pdfUpload", JSON.stringify(pdfUpload.name));
              const formData = new FormData();
              formData.append("file", pdfUpload);
              formData.append("fileName", pdfUploadName);
              formData.append("name", pdf.name);
              formData.append("email", pdf.email);
              formData.append("password", pdf.password);
              formData.append("Book", pdf.Book);
              formData.append("Bookname", pdf.Bookname);
              formData.append("Authername", pdf.Authername);
              


              const options = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                body: JSON.stringify(body),
              };
              try {
                const res = await axios.post(
                  "https://raft-labs-api.vercel.app/addUser",
                  formData,
                  pdf.name,
                  pdf.email,
                  pdf.password,
                  pdf.Book,
                  pdf.Bookname,
                  pdf.Authername
                );
                // before sending this send the user id
                toast("data uploaded sucessfully");
                navigate("/viewBooks");
              } catch (ex) {
                console.log(ex);
              }
            } else {
              toast(
                `the pdfUpload size is ${Math.round(
                  pdfUpload.size / 1024
                )}KB please upload pdfUpload with 100kB`
              );
            }
          } else {
            toast("please enter a valid pdf");
          }
        } else {
          toast("please enter a pdf");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="container h-100 d-flex mt-5 align-items-center justify-content-center border-2 text-light">
        <Form onSubmit={submitHandler} encype="multipart/form-data" className="HomeForm">
      <h3 className=""><u><b>LOGIN</b></u></h3>
          <Form.Group className="mb-3">
            <Form.Label ><b>NAME:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="ENTER NAME"
              name="name"
              value={pdf.name}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label ><b>Email address:</b></Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={pdf.email}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label ><b>Password:</b></Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={pdf.password}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label ><b>Enter Book Name:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book name"
              name="Bookname"
              value={pdf.Bookname}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label ><b>Enter Auther Name:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Auther Name"
              name="Authername"
              value={pdf.Authername}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label ><b>Book Description:</b></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Book Description"
              name="Book"
              value={pdf.Book}
              onChange={changeHandler}
            />
          </Form.Group>
          <input
            type="file"
            name="mypdfUpload"
            onChange={(event) => {
              setpdfUpload(event.target.files[0]);
            }}
          />

          <Button style={{backgroundColor: '#fc5101'}} type="submit">
            Submit
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddBooks;
