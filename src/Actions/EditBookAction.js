import Swal from "sweetalert2";
import { uploadImage } from "../utils/Cloudinary";

export async function EditBookAction(id, formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");

  let imageUrl;
  if (image && image.name) {
    try {
      imageUrl = await uploadImage(image, "devoir3");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "There was an error uploading the image.",
        icon: "error",
      });
      return;
    }
  }

  // Get existing books from local storage
  let books = JSON.parse(localStorage.getItem("books"));

  // Find the book with the given id and update its properties
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    // Update title, description, and optionally image URL
    books[index] = {
      ...books[index],
      title,
      description,
      ...(imageUrl && { image: imageUrl }),
    };

    // Save updated books array back to local storage
    localStorage.setItem("books", JSON.stringify(books));

    Swal.fire({
      title: "Good job!",
      text: "You edited a book!",
      icon: "success",
    }).then(() => {
      window.location.reload();
    });
  } else {
    Swal.fire({
      title: "Error!",
      text: "Book not found!",
      icon: "error",
    });
  }
}
