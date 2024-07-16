import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { truncateText } from "../utils/Truncate";
import { Button } from "react-bootstrap";
import { CiBookmarkRemove } from "react-icons/ci";
import { removeFromFavorites } from "../Actions/RemoveFromFavorites";

function Favorites() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const favorites = localStorage.getItem("favs");
    if (favorites) {
      setFavs(JSON.parse(favorites));
    }
  }, []);

  return (
    <div className="my-5">
      {favs.length > 0 ? (
        <div className="row d-flex justify-content-center gap-3">
          {/* Mapping over favs array */}
          {favs.map((fav) => (
            <Card key={fav.id} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Img variant="top" src={fav.image} />
                <Card.Title>{fav.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {/* Assuming truncateText function truncates description */}
                  {truncateText(fav.description, 10)}
                </Card.Subtitle>
                {/* Example of Card Links (if needed) */}
                {/* <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
              <div className="d-flex justify-content-center">
                <Button variant="info" className="btn btn-danger">
                  <CiBookmarkRemove
                    size={28}
                    onClick={async () => {
                      const updatedFavs = await removeFromFavorites(fav.id);
                      setFavs(updatedFavs);
                    }}
                  />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-danger">
          <h2>No Favorites found in local storage</h2>
        </div>
      )}
    </div>
  );
}

export default Favorites;
