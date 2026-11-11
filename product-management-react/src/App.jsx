
import { useState, useEffect } from "react";

import BookList from "./Component/BookList.jsx";
import FavoriteBookList from "./Component/FavoriteBookList.jsx";
import AddBookForm from "./Component/AddBookForm.jsx";
import SearchBar from "./Component/SearchBar.jsx";
import SortButton from "./Component/SortButton.jsx";
import BookStats from "./Component/BookStats.jsx";
import CategoryFilter from "./Component/CategoryFilter.jsx";

// Import CSS Module
import styles from "./App.module.css";

const books = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programming", favorite: false },
    { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self-help", favorite: true },
    { id: 3, title: "Deep Work", author: "Cal Newport", category: "Self-help", favorite: true },
    { id: 4, title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", favorite: false },
    { id: 5, title: "Design Patterns", author: "Gang of Four", category: "Programming", favorite: true }
];

function App() {
    const [bookList, setBookList] = useState(() => {
        const savedBooks = localStorage.getItem("book-list");

        if (savedBooks === null) {
            return books;
        }

        try {
            const parsedBooks = JSON.parse(savedBooks);

            if (Array.isArray(parsedBooks)) {
                return parsedBooks;
            }
        } catch (error) {
            console.error("Không thể đọc danh sách:", error);
        }

        return books;
    });

    const [isSorted, setIsSorted] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // Lưu danh sách vào localStorage
    useEffect(() => {
        localStorage.setItem(
            "book-list",
            JSON.stringify(bookList)
        );
    }, [bookList]);

    // Cập nhật sách
    function handleUpdateBook(id, updateData) {
        setBookList(prevBookList =>
            prevBookList.map(book =>
                book.id === id
                    ? {
                        ...book,
                        title: updateData.title,
                        author: updateData.author
                    }
                    : book
            )
        );
    }

    // Thêm sách
    function handleAddBook(newBook) {
        setBookList(prevBookList => [
            ...prevBookList,
            newBook
        ]);
    }

    // Đánh dấu yêu thích
    function handleToggleFavorite(id) {
        setBookList(prevBookList =>
            prevBookList.map(book =>
                book.id === id
                    ? { ...book, favorite: !book.favorite }
                    : book
            )
        );
    }

    // Xóa sách
    function deleteBook(id) {
        setBookList(prevBookList =>
            prevBookList.filter(book => book.id !== id)
        );
    }

    // Bật / tắt sắp xếp
    function handleSort() {
        setIsSorted(prev => !prev);
    }

    // Tìm kiếm sách
    function searchBook(bookList, search) {
        return bookList.filter(book =>
            book.title
                .toLowerCase()
                .includes(search.trim().toLowerCase())
        );
    }

    // Lọc theo thể loại
    function filterBooksByCategory(books, selectedCategory) {
        return books.filter(book =>
            selectedCategory === "" ||
            selectedCategory === book.category
        );
    }

    // Search -> Filter -> Sort
    const searchedBooks = searchBook(bookList, search);

    const filteredBooks = filterBooksByCategory(
        searchedBooks,
        selectedCategory
    );

    const displayedBooks = isSorted
        ? [...filteredBooks].sort((a, b) =>
            a.title.localeCompare(b.title)
        )
        : filteredBooks;

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                {/* HEADER */}
                <header className={styles.header}>
                    <div>
                        <p className={styles.eyebrow}>
                            Book Manager
                        </p>

                        <h1 className={styles.title}>
                            My Library
                        </h1>

                        <p className={styles.subtitle}>
                            Quản lý thư viện sách cá nhân
                        </p>
                    </div>

                    <span className={styles.bookCount}>
                        {bookList.length} books
                    </span>
                </header>

                {/* SEARCH - CATEGORY FILTER - SORT */}
                <section className={styles.toolbar}>
                    <SearchBar
                        search={search}
                        onSearchChange={setSearch}
                    />

                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />

                    <SortButton
                        isSorted={isSorted}
                        onToggleSort={handleSort}
                    />
                </section>

                {/* MAIN CONTENT */}
                <div className={styles.mainLayout}>

                    {/* DANH SÁCH SÁCH */}
                    <main className={styles.panel}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                Danh sách sách
                            </h2>
                        </div>

                        {displayedBooks.length === 0 ? (
                            <p className={styles.emptyState}>
                                No books found.
                            </p>
                        ) : (
                            <BookList
                                books={displayedBooks}
                                onUpdateBook={handleUpdateBook}
                                handleToggleFavorite={handleToggleFavorite}
                                deleteBook={deleteBook}
                            />
                        )}
                    </main>

                    {/* SIDEBAR */}
                    <aside className={styles.sideColumn}>

                        {/* THỐNG KÊ */}
                        <section className={styles.panel}>
                            <BookStats books={bookList} />
                        </section>

                        {/* SÁCH YÊU THÍCH */}
                        <section className={styles.panel}>
                            <h2 className={styles.sectionTitle}>
                                Favorite Books
                            </h2>

                            <FavoriteBookList books={bookList} />
                        </section>

                        {/* FORM THÊM SÁCH */}
                        <section
                            className={`${styles.panel} ${styles.formPanel}`}
                        >
                            <h2 className={styles.sectionTitle}>
                                Add New Book
                            </h2>

                            <AddBookForm
                                onAddBook={handleAddBook}
                            />
                        </section>

                    </aside>
                </div>
            </div>
        </div>
    );
}

export default App;
