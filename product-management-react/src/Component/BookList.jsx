
import BookCard from "./BookCard.jsx";
import styles from "./BookList.module.css";

function BookList({
    books,
    onUpdateBook,
    handleToggleFavorite,
    deleteBook
}) {
    return (
        <div className={styles.grid}>
            {books.map(book => (
                <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    favorite={book.favorite}
                    handleToggleFavorite={handleToggleFavorite}
                    deleteBook={deleteBook}
                    onUpdateBook={onUpdateBook}
                />
            ))}
        </div>
    );
}

export default BookList;
