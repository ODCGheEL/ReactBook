import Swal from "sweetalert2";
import { deleteCloudinaryImage } from "../utils/Cloudinary";

export async function DeleteBookAction(id, deleteToken) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    await deleteCloudinaryImage(deleteToken)
    // Get existing books from local storage
    let books = JSON.parse(localStorage.getItem("books")) || [];

    // Filter out the book with the given id
    const updatedBooks = books.filter((book) => book.id !== id);

    // Save the updated books array back to local storage
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    Swal.fire("Deleted!", "Your book has been deleted.", "success").then(() => {
      window.location.reload();
    });
  }
}
