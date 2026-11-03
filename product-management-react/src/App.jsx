import { useState } from "react";
import CounterButton from "./Component/CounterButton.jsx";
import BookList from "./Component/BookList.jsx";
import FavoriteBookList from "./Component/FavoriteBookList.jsx";


const books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", favorite: false },
  { id: 2, title: "Atomic Habits", author: "James Clear", favorite: true },
  { id: 3, title: "Deep Work", author: "Cal Newport", favorite: true },
  { id: 4, title: "The Pragmatic Programmer", author: "Andrew Hunt", favorite: false },
  { id: 5, title: "Design Patterns", author: "Gang of Four", favorite: true }
];


function App() {

    const [count, setCount] = useState(0);
    const [bookList, setBookList] = useState(books);


    function handleIncrement() {
        setCount(count + 1);
    }
    function handleDecrement() {
        setCount(count - 1);
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
    

    return (
        <div>
            <h1>Book List</h1>
            <BookList books={bookList} handleToggleFavorite={handleToggleFavorite} deleteBook={deleteBook} />
            <h2>Favorite Books</h2>
            <FavoriteBookList books={bookList}/>
            <h1>Counter</h1>
            <p>Count: {count}</p>
            <CounterButton onPress={handleIncrement} label="Increment" />
            <CounterButton onPress={handleDecrement} label="Decrement" />
        </div>
    );
    
}

export default App;
