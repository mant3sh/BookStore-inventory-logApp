import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataSerive from "../service/bookservice";
function AddBook({ id, getbookId }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({
    error: false,
    msg: "",
  });
  const edithandler = async () => {
    setMessage("");
    try {
      const bookdata = await BookDataSerive.getBook(id);
      setTitle(bookdata.data().title);
      setAuthor(bookdata.data().author);
      setStatus(bookdata.data().status);
    } catch (error) {
      setMessage({
        error: true,
        msg: error.message,
      });
    }
  };
  useEffect(() => {
    if (id != undefined && id !== "") {
      edithandler();
    }
  }, [id]);
  const handelSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || author === "") {
      setMessage({ error: true, msg: "All feilds are mandatory" });
      return;
    }
    const newBook = {
      title,
      author,
      status,
    };

    try {
      if (id != undefined && id !== "") {
        await BookDataSerive.updateBook(id, newBook);
        getbookId("");
        setMessage({
          error: false,
          msg: "Book Updated Sucessfully",
        });
      } else {
        await BookDataSerive.addBooks(newBook);
        setMessage({
          error: false,
          msg: "Book added sucessfully",
        });
      }

      setTitle("");
      setAuthor("");
    } catch (error) {
      setMessage({
        error: true,
        msg: error.message,
      });
    }
  };

  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        <Form onSubmit={handelSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default AddBook;
