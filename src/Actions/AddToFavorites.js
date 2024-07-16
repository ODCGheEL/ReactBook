import { toast } from "react-toastify";

export async function addToFavorites(id, title, description, image) {
  try {
    let favs = JSON.parse(localStorage.getItem("favs")) || [];

    const newBook = {
      id: Date.now(),
      title,
      description,
      image,
    };
    favs.push(newBook);
    localStorage.setItem("favs", JSON.stringify(favs));
    toast.success("Book added to favorites");
    return favs;
  } catch (error) {
    toast.error(error.message || error);
  } finally {
    setTimeout(() => {
      window.location.reload();
    }, [1000]);
  }
}
