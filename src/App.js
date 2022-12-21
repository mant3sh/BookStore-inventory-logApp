import "./App.css";
import AddBook from "./Components/AddBook";
import { Container, Navbar, Row, Col, Button } from "react-bootstrap";
import BookList from "./Components/BookList";
import { useState } from "react";
import { useUserAuth } from "./service/UserAuthContext";

function App() {
  const { Logout } = useUserAuth();
  const [bookid, setBookid] = useState("");

  const getbookId = (id) => {
    setBookid(id);
  };
  const handelLogout = async () => {
    try {
      await Logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">
            <Row>
              <Col>Namma Book Store</Col>
              <Col>
                <Button variant="success" onClick={handelLogout}>
                  Logout
                </Button>
              </Col>
            </Row>
          </Navbar.Brand>
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
