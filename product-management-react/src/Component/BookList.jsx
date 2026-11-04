import BookCard from "./BookCard.jsx";
export default BookList;
function BookList({ books, handleToggleFavorite, deleteBook }) {
    return (
        <div>
            {books.map(book => (
                <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    favorite={book.favorite}
                    handleToggleFavorite={handleToggleFavorite}
                    deleteBook={deleteBook}
                />
            ))}
        </div>
    );
}