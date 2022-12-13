import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import EditPdf from "./EditPdf";

const ViewBooks = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      alert("Please login to View this page");
      navigate("/");
    }
  }, []);

  const getImages = async () => {
    const getAllImages = await fetch(`http://localhost:8000/allUser`);
    const res = await getAllImages.json();
    setUser(res);
  };
  useEffect(() => {
    getImages();
  }, []);

  const DeleteImg = async (id) => {
    const dltuser = await fetch(`http://localhost:8000/dlt/${id}`, {
      method: "Delete",
    });
    alert("deleted sucessfully");
    getImages();
  };
  return (
    <>
     
      <div className="container p-5">
      <form autoComplete="off">
        <input
          className="mt-3 "
          id="viewEmployeeSearch"
          style={{
            width: "271px",
            borderRadius: "6px",
            marginLeft: "35vw",
            float:'right',
            height: '38px',
            padding: '18px',
          }}
          type="text"
          placeholder="Search..🔍"
          value={search.toUpperCase()}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
        <h1 className="text-light">ALL BOOKS</h1>
        <div className="row ">
          {user.length === 0 ? (
            <h1 className="text-light">NO Books TO DISPLAY</h1>
          ) : (
            user
              .filter((book) => {
                if (search === "") {
                  return book;
                }
                if (
                  book.Authername.toLocaleLowerCase().includes(
                    search.toLocaleLowerCase()
                  )
                ) {
                  return book;
                }
                if (
                  book.Book.toLocaleLowerCase().includes(
                    search.toLocaleLowerCase()
                  )
                ) {
                  return book;
                }
              })
              .map((pdf) => {
                return (
                  <>
                    <div className="col-sm mt-3">
                      <Card
                        className="card"
                        style={{
                          width: "18rem",
                          display: "flex",
                          padding: "12px",
                        }}
                        key={pdf._id}
                      >
                        <object
                          type="application/pdf"
                          data={`http://localhost:8000/uploads/${pdf.filename} target="_blank" rel="noopener noreferrer"`}
                          width="100%"
                          height="100%"
                        >
                          <p>
                            View Pdf
                            <span>
                              <a
                                className="p-2"
                                href={`http://localhost:8000/uploads/${pdf.filename} `}
                              >
                                <span>VIEW {pdf.fileType}</span>
                              </a>
                            </span>
                          </p>
                        </object>
                        <Card.Body>
                          <Card.Title>{pdf.name}</Card.Title>
                          <Card.Text>
                            <b>Book</b>:{pdf.Bookname}
                          </Card.Text>
                          <Card.Text>
                            <b>Authername</b>:{pdf.Authername}
                          </Card.Text>
                          <Card.Text>
                            <b>DESSCRIPTION</b>:{pdf.Book}
                          </Card.Text>

                          <div className="d-flex ">
                            <Button
                              style={{ backgroundColor: "#fc5101" }}
                              onClick={() => DeleteImg(pdf._id)}
                            >
                              Delete
                            </Button>
                            <Card.Text style={{ marginLeft: "16px" }}>
                              <td>
                                <EditPdf pdf={pdf} getImages={getImages} />
                              </td>
                            </Card.Text>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </>
                );
              })
          )}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </>
  );
};

export default ViewBooks;
