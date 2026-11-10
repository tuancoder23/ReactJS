import { useState,useEffect } from "react";
import BookList from "./Component/BookList.jsx";
import FavoriteBookList from "./Component/FavoriteBookList.jsx";
import AddBookForm from "./Component/AddBookForm.jsx";
import SearchBar from "./Component/SearchBar.jsx";
import SortButton from "./Component/SortButton.jsx";
import BookStats from "./Component/BookStats.jsx";

const books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", favorite: false },
  { id: 2, title: "Atomic Habits", author: "James Clear", favorite: true },
  { id: 3, title: "Deep Work", author: "Cal Newport", favorite: true },
  { id: 4, title: "The Pragmatic Programmer", author: "Andrew Hunt", favorite: false },
  { id: 5, title: "Design Patterns", author: "Gang of Four", favorite: true }
];


function App() {

    
    const [bookList, setBookList] = useState(() => {
        const savedBooks = localStorage.getItem("book-list");

        if(savedBooks !== null){
            return JSON.parse(savedBooks);
        }
        return books;
    });
    const [isSorted, setIsSorted] = useState(false); // isSorted = fasle
    const [search,setSearch] = useState("");



    useEffect(() => {
        localStorage.setItem(
            "book-list",JSON.stringify(bookList)
        );
    },[bookList]);


    function handleAddBook(newBook){
        setBookList(bookList => [...bookList,newBook]);
        
    }

    
    function handleToggleFavorite(id) {
        setBookList(prevBookList =>
            prevBookList.map(book =>
                book.id === id ? { ...book, favorite: !book.favorite } : book
            )
        );
    }
    function deleteBook(id) {
        setBookList(prevBookList =>
            prevBookList.filter(book => book.id !== id)
        );
    }
    
    function handleSort(){
        setIsSorted(pre => !pre);
    }

    function searchBook(bookList, search){
        return bookList.filter(book => book.title.toLowerCase().includes(search.trim().toLowerCase()));
    } 

    const searchedBooks = searchBook(bookList, search);

    const displayedBooks = isSorted ? [...searchedBooks].sort((a, b) => a.title.localeCompare(b.title)) : searchedBooks;

    
    return (
        <div>
            <h1>Book List</h1>
            {displayedBooks.length == 0 ? (
                <p>No books found.</p>
            ) : (<BookList books={displayedBooks} handleToggleFavorite={handleToggleFavorite} deleteBook={deleteBook} />

            )}
            <h2>Favorite Books</h2>
            <FavoriteBookList books={bookList}/>  
            <SortButton isSorted={isSorted} onToggleSort={handleSort} />
            <SearchBar search={search} onSearchChange={setSearch}/>
            <AddBookForm onAddBook={handleAddBook} />
            <BookStats books={bookList}/>
        </div>
    );
    
}

export default App;
