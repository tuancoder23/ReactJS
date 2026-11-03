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


/*  HỌC NGÀY TRƯỚC TRONG CHATGPT ÔN TẬP JS

const initialProducts = [
    { id: 1, name: "Laptop Dell", price: 20000000 },
    { id: 2, name: "Mouse", price: 500000 }
];


const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    // Đọc dữ liệu khi khởi tạo
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("products");

        return savedProducts !== null
            ? JSON.parse(savedProducts)
            : initialProducts;
    });

    // Lưu dữ liệu khi products thay đổi
    useEffect(() => {
        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );
    }, [products]);


    // Tính tổng giá trị sản phẩm bằng reduce
    const totalPrice = products.reduce((total, product) => {
    return total + product.price;
    }, 0);

    // Xóa sản phẩm
    function deleteProduct(id) {
        setProducts(prevProducts =>
            prevProducts.filter(product => product.id !== id)
        );
    }

    // Thêm sản phẩm
    function addProduct() {
        const productName = name.trim();
        const productPrice = Number(price);

        if (
            productName === "" ||
            price.trim() === "" ||
            !Number.isFinite(productPrice) ||
            productPrice < 0
        ) {
            alert("Vui lòng nhập tên và giá hợp lệ");
            return;
        }

        // Kiểm tra sản phẩm trùng tên bằng some
        const normalizedName = productName.toLowerCase();

        const isDuplicate = products.some(product =>
        product.name.trim().toLowerCase() === normalizedName
        );

        if (isDuplicate) {
        alert("Sản phẩm đã tồn tại!");
        return;
        }

        const newProduct = {
            id: crypto.randomUUID(),
            name: productName,
            price: productPrice
        };

        setProducts(prevProducts => [...prevProducts, newProduct]);

        setName("");
        setPrice("");
    }

    // Cập nhật giá sản phẩm
    function updateProduct(id, inputPrice) {

        // Người dùng nhấn Cancel
        if (inputPrice === null) {
            return;
        }

        // Kiểm tra bỏ trống
        if (inputPrice.trim() === "") {
            alert("Vui lòng nhập giá!");
            return;
        }

        const updatedPrice = Number(inputPrice);

        // Kiểm tra giá hợp lệ
        if (!Number.isFinite(updatedPrice) || updatedPrice < 0) {
            alert("Giá sản phẩm không hợp lệ!");
            return;
        }

        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id
                    ? { ...product, price: updatedPrice }
                    : product
            )
        );
    }

    // Hiển thị danh sách sản phẩm
    const hienThiSanPham = products.map(product => {
        return (
            <div key={product.id}>
                <h2>{product.name}</h2>
                <p>Price: {product.price}</p>

                <button onClick={() => deleteProduct(product.id)}>
                    Delete
                </button>

                <button onClick={() => {
                    const inputPrice = window.prompt(
                        "Nhập giá mới:",
                        String(product.price)
                    );

                    updateProduct(product.id, inputPrice);
                }}>
                    Update
                </button>
            </div>
        );
    });

    return (
        <div>
            <h1>Product Management</h1>

           
            <input
                placeholder="Nhập tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            
            <input
                type="number"
                placeholder="Nhập giá sản phẩm"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <button onClick={addProduct}>
                Add Product
            </button>

           
            <div>
                {hienThiSanPham}
            </div>
            
            <div>
            <h2>Tổng giá sản phẩm</h2>
            <p>{totalPrice.toLocaleString("vi-VN")} VNĐ</p> 
            </div>
        </div>
    );
*/