import FavoriteButton from "./FavoriteButton.jsx";
import { useState } from "react"
import styles from "./BookCard.module.css";
export default BookCard;

function BookCard({ id, title, author, favorite, handleToggleFavorite, deleteBook, onUpdateBook }) {
    const [isEditing, setIsEditing] = useState(false);

    const [editTitle, setEditTitle] = useState(title);
    const [editAuthor, setEditAuthor] = useState(author);


    function handleEdit() {
        setEditTitle(title);
        setEditAuthor(author);
        setIsEditing(true);
    }
    function handleSave() {
        // Bước 1: Validation
        if (!editTitle.trim() || !editAuthor.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }


        // Bước 2: Gọi callback Update
        onUpdateBook(id, {
            title: editTitle.trim(),
            author: editAuthor.trim()
        });

        // Bước 3: Đóng form
        setIsEditing(false);
    }
    function handleCancel() {
        setEditTitle(title);
        setEditAuthor(author);
        setIsEditing(false);
    }

    return (

        <div className={styles.card}>
            <h2>{id}</h2>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.author}>Author: {author}</p>
            <p>Favorite: {favorite ? "Yes" : "No"}</p>
            <FavoriteButton favorite={favorite} onToggle={() => { handleToggleFavorite(id) }} />
            <button onClick={() => deleteBook(id)}>Delete</button>
            {isEditing ? (
                <>
                    <div>
                        {/* Hai input */}
                        <input type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <input type="text"
                            value={editAuthor}
                            onChange={(e) => setEditAuthor(e.target.value)}
                        />
                    </div>
                    <div className={styles.actions}>

                        <button onClick={() => handleSave()}>Save</button>

                        <button onClick={() => handleCancel()}>Cancel</button>
                    </div>
                </>
            ) : (
                // Nút Edit
                <button onClick={handleEdit}>Edit</button>
            )}

        </div>


    );
}