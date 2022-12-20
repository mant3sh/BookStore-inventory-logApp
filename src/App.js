import "./App.css";
import AddBook from "./Components/AddBook";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import BookList from "./Components/BookList";
import { useState } from "react";

function App() {
  const [bookid, setBookid] = useState("");
  const getbookId = (id) => {
    setBookid(id);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Namana Book Store</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook id={bookid} getbookId={getbookId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BookList getbookId={getbookId} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
