export default FavoriteBookList;

function FavoriteBookList({ books }) {
    const favoriteBooks = books.filter(book => book.favorite);
    return (
        <div>
            {favoriteBooks.map(book => (
                <div key={book.id}>
                    <h2>{book.title}</h2>
                    <p>Author: {book.author}</p>
                </div>
            ))}
        </div>
    );
}
