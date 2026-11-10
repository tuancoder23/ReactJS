function BookStats({ books }) {
    const totalBooks = books.length;

    // Tính favoriteCount
    const favoriteCount = books.filter(book => book.favorite === true).length;

    // Tính notFavoriteCount
    const notFavoriteCount = totalBooks - favoriteCount;
    return (
        <div>
            <h2>Thống kê sách</h2>

            {/* Hiển thị ba chỉ số */}
            <p>Tổng sách: {totalBooks}</p>
            <p>Yêu thích: {favoriteCount}</p>
            <p>Chưa thích: {notFavoriteCount}</p>
        </div>
    );
}

export default BookStats;