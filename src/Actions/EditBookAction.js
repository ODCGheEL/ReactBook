import Swal from "sweetalert2";
import { deleteCloudinaryImage, uploadImage } from "../utils/Cloudinary";

export async function EditBookAction(id, formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");

  let imageUrl;
  let deleteToken;

  // Get existing books from local storage
  let books = JSON.parse(localStorage.getItem("books"));

  // Find the book with the given id
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    const existingBook = books[index];

    // Check if there's a new image to upload
    if (image && image.name) {
      try {
        // Upload new image
        const uploadResult = await uploadImage(image, "devoir3");
        imageUrl = uploadResult.secureUrl;
        deleteToken = uploadResult.deleteToken;
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "There was an error uploading the image.",
          icon: "error",
        });
        return;
      }

      // Delete the old image from Cloudinary
      if (existingBook.imageDeleteToken) {
        try {
          await deleteCloudinaryImage(existingBook.imageDeleteToken);
        } catch (error) {
          console.error("Error deleting old image:", error);
          // Handle error if needed
        }
      }
    }

    // Update title, description, and optionally image URL and delete token
    books[index] = {
      ...books[index],
      title,
      description,
      ...(imageUrl && { image: imageUrl, imageDeleteToken: deleteToken }),
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
