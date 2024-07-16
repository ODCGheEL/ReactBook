import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/NavbarComp";
import CardComp from "./components/CardComp";
import Favorites from "./components/Favorites";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Books } from "./Books";
import AddBookModal from "./components/AddBookModal";
import BookList from "./components/BooksList";
import { fetchBookApi } from "./utils/Api";
import { truncateText } from "./utils/Truncate";
import { Col, Form, Row } from "react-bootstrap";

export default function App() {
  const [fetchedBooks, setFetchedBooks] = useState([]);

  const [search, setSearch] = useState("");

  const [update, setUpdate] = useState(false)

  function reRender(value){
    setUpdate((prev)=> prev = !!value)
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function fetchBooksFromApi() {
      const books = await fetchBookApi();
      setFetchedBooks(books);
    }
    fetchBooksFromApi();
  }, []);

  useEffect(() => {
    async function fetchApiWithSearch() {
      const result = await fetchBookApi(search);
      setFetchedBooks(result);
    }
    fetchApiWithSearch();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="container mt-5" id="home">
        <div className="my-5 pt-5">
          <BookList />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Button variant="primary" onClick={handleShow}>
          Add Book
        </Button>
      </div>

      <AddBookModal show={show} handleClose={handleClose} />
      <hr />
      <div className="container my-5" id="favorites">
        <h2 className="text-lg text-center text-decoration-underline">
          Favorites:
        </h2>
        <div className="" id="favorites">
          <Favorites />
        </div>
      </div>
      <hr />

      {/* search input */}

      <Form>
        <Row className="d-flex justify-content-center my-5">
          <Col xs="auto" className="">
            <Form.Control
              type="text"
              placeholder="Search Google Books API"
              className=" mr-sm-2 "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>

        </Row>
      </Form>

      <div className="container">
        <h2 className="text-lg text-decoration-underline text-center">
          Fetched Books from api:
        </h2>
        <div className="container my-5">
          {fetchedBooks ? (
            <div className="row">
              {fetchedBooks.map((book) => (
                <div className="col-md-4" key={book.id}>
                  <CardComp
                    title={book.title}
                    description={truncateText(book.description)}
                    image={book.cover_image}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-danger">
              <h2>No Books fetched from api</h2>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
