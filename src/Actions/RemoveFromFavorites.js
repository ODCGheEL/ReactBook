import { toast } from "react-toastify";

export async function removeFromFavorites(id) {
  try {
    // Retrieve current favorites from local storage
    let favs = JSON.parse(localStorage.getItem("favs")) || [];

    // Filter out the item with the specified id
    favs = favs.filter((fav) => fav.id !== id);

    // Update local storage with the filtered favorites
    localStorage.setItem("favs", JSON.stringify(favs));

    // Notify user of success
    toast.success("Book removed from favorites");
    return favs;
  } catch (error) {
    // Handle errors
    toast.error(error.message || "Error removing book from favorites");
  } 
}
