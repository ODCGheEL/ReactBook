import Swal from "sweetalert2";
import { uploadImage } from "../utils/Cloudinary";

export async function AddBookAction(formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");

  console.log("title", title, "description", description);

  let imageUrl;
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

  let books = JSON.parse(localStorage.getItem("books")) || [];

  // Add new book to the array
  const newBook = {
    id: Date.now(),
    title,
    description,
    image: imageUrl.secureUrl,
    imageDeleteToken: imageUrl.deleteToken,
  };
  books.push(newBook);

  // Save updated books array back to local storage
  localStorage.setItem("books", JSON.stringify(books));

  Swal.fire({
    title: "Good job!",
    text: "You added a book!",
    icon: "success",
  }).then(() => {
    window.location.reload();
  });
}
