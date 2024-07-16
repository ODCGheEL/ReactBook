import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { EditBookAction } from "../Actions/EditBookAction";

const EditBookModal = ({ show, handleClose, id, title, description }) => {
  const [titleIn, setTitle] = useState(title);
  const [descriptionIn, setDescription] = useState(description);
  const [image, setImage] = useState(null);

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    await EditBookAction(id, formData);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editing a Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Book Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a book title"
              value={titleIn}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the book description"
              value={descriptionIn || ""}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleClose();
            handleSubmit();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBookModal;
