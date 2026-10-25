import { useState } from "react";

const initialProducts = [
    { id: 1, name: "Laptop Dell", price: 20000000 },
    { id: 2, name: "Mouse", price: 500000 }
];

function App() {
    
    const [products, setProducts] = useState(initialProducts);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");


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
        const isDuplicate = products.some(product =>
        product.name.trim().toLowerCase() ===
        productName.toLowerCase()
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

            {/* Ô nhập tên sản phẩm */}
            <input
                placeholder="Nhập tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            {/* Ô nhập giá sản phẩm */}
            <input
                type="number"
                placeholder="Nhập giá sản phẩm"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <button onClick={addProduct}>
                Add Product
            </button>

            {/* Danh sách sản phẩm */}
            <div>
                {hienThiSanPham}
            </div>
            {/* Tổng giá sản phẩm */}
            <div>
            <h2>Tổng giá sản phẩm</h2>
            <p>{totalPrice.toLocaleString("vi-VN")} VNĐ</p> 
            </div>
        </div>
    );
}

export default App;