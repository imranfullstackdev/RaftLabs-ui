import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";

const Editpdf = ({ pdf, getImages }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [image, setImage] = useState();

  const [data, setData] = useState(pdf);
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const EditHandler = async (e, id) => {
    e.preventDefault();

    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.Book ||
      !data.Bookname
    ) {
      toast.error("PLEASE ENTER ALL THE DETAILS", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const addpdf = await fetch(`http://localhost:8000/EditUser/${id}`, {
          method: "put",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await addpdf.json();
        if (addpdf.status === 200) {
          getImages();
          toast.success(res.mess, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(res.err, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ backgroundColor: "#fc5101", marginLeft: "16px" }}
      >
        EDIT
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="h-100 d-flex align-items-center justify-content-center border-2">
            <Form
              onSubmit={(e) => {
                EditHandler(e, pdf._id);
              }}
              encype="multipart/form-data"
            >
              <h3 className="">
                <u>
                  <b>EDIT PAGE</b>
                </u>
              </h3>
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>NAME</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ENTER NAME"
                  name="name"
                  defaultValue={pdf.name}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  <b>Email address</b>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  defaultValue={pdf.email}
                  onChange={changeHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <b>Enter Book Name</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Book name"
                  name="Bookname"
                  defaultValue={pdf.Bookname}
                  onChange={changeHandler}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>
                  <b>Book Description</b>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Book Description"
                  name="Book"
                  defaultValue={pdf.Book}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Button
                style={{ backgroundColor: "#fc5101" }}
                type="submit"
                onClick={handleClose}
              >
                Submit
              </Button>
            </Form>
            <ToastContainer />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Editpdf;
