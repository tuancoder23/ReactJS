import FavoriteButton from "./FavoriteButton.jsx";
export default BookCard;

function BookCard({ id,title, author, favorite, handleToggleFavorite, deleteBook }) {
    return (
        <div>
            <h2>{id}</h2>
            <h2>{title}</h2>
            <p>Author: {author}</p>
            <p>Favorite: {favorite ? "Yes" : "No"}</p>
            <FavoriteButton favorite={favorite} onToggle={() => {handleToggleFavorite(id)}} />
            <button onClick={() => deleteBook(id)}>Delete</button>
        </div>
    );
}