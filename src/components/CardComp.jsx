import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { DeleteBookAction } from "../Actions/DeleteBookAction";
import { addToFavorites } from "../Actions/AddToFavorites";
import ModalComp from "./EditBookModal";
import EditBookModal from "./EditBookModal";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";

function CardComp({ id, title, description, image, imageDeleteToken }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ width: "18rem", minHeight: "10rem" }} className="my-5">
        <Card.Img variant="top" src={image} />
        <Card.Body style={{ display: "flex", flexDirection: "column" }}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <div className=" d-flex gap-2 justify-content-center">
            <Button
              onClick={() => addToFavorites(id, title, description, image)}
            >
              <GoStarFill size={28} />
            </Button>
            <Button
              variant="info"
              onClick={() => {
                handleShow();
              }}
            >
              <MdEdit size={28} />
            </Button>
            <Button
              variant="danger"
              onClick={() => DeleteBookAction(id, imageDeleteToken)}
            >
              <FaTrash size={28} />
            </Button>
          </div>
        </Card.Body>
        <EditBookModal
          show={show}
          id={id}
          title={title}
          description={description}
          handleClose={handleClose}
        />
      </Card>
      <EditBookModal
        show={show}
        id={id}
        title={title}
        description={description}
        handleClose={handleClose}
      />
    </>
  );
}

export default CardComp;
