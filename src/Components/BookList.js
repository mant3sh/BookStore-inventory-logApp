import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from "../service/bookservice";

function BookList({ getbookId }) {
  const [books, setBooks] = useState([]);
  const getbooks = async () => {
    const data = await BookDataService.getAllBooks();

    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getbooks();
  }, []);
  const deleteHandeler = async (id) => {
    await BookDataService.removeBook(id);
    getbooks();
  };
  return (
    <>
      <div className="mb-2">
        <Button
          variant="dark edit"
          onClick={() => {
            getbooks();
          }}
        >
          Refresh List
        </Button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => {
                      getbookId(doc.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => {
                      deleteHandeler(doc.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default BookList;
