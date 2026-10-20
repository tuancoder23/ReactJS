import { useState } from "react";

const initialProducts = [
  { id: 1, name: "Laptop Dell", price: 20000000 },
  { id: 2, name: "Mouse", price: 500000 }
];


function App() {
  const [products, setProducts] = useState(initialProducts);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const hienThiSanPham = products.map((product) => {
    return (
        
        <div key={product.id} >
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            {/*Gắn nút Delete vào từng sản phẩm*/}
            <button onClick={() => deleteProduct(product.id)}>
                Delete
            </button>
            <button onClick={() => {
                // Hiển thị prompt để nhập giá mới
                const inputPrice = window.prompt("Nhập giá mới:", String(product.price));

                if (inputPrice !== null) {
                    updateProduct(product.id, parseFloat(inputPrice));
                }
                
            }}>
                Update
            </button>
        </div>
    
        
    );
});

//Xóa sản phẩm bằng useState
function deleteProduct(id) {
    setProducts(prevProducts => { // sẽ là mảng chứa các sản phẩm hiện tại
        // Sử dụng filter() để giữ lại sản phẩm
        // có id khác id cần xóa
        return prevProducts.filter(product => product.id !== id); // trả về mảng mới không chứa sản phẩm có id cần xóa
    });

}
// Thêm sản phẩm bằng useState
function addProduct() {
    const productName = name.trim(); // loại bỏ khoảng trắng đầu và cuối
    const productPrice = Number(price); // chuyển price từ string sang number
    if (productName === ""|| price.trim() === "" || !Number.isFinite(productPrice) || productPrice < 0) { // kiểm tra name và price không rỗng
         alert("Vui lòng nhập tên và giá hợp lệ");
        return;
    }
    const newProduct = {
            id:  crypto.randomUUID(), // tạo id mới dựa trên số lượng sản phẩm hiện tại
            name: productName,
            price: parseFloat(productPrice) // chuyển price từ string sang number
        };
        setProducts(prevProducts => [...prevProducts, newProduct]);
        // Reset lại giá trị của name và price sau khi thêm sản phẩm
        setName("");
        setPrice("");
}

// cập nhật sản phẩm bằng map()
function updateProduct(id, newPrice) {
    const updatedPrice = Number(price);
    if (updatedPrice === null) {
        // Người dùng đã hủy prompt
        return;
    }
    setProducts(prevProducts => {
        return prevProducts.map(product => {
            if (/* Kiểm tra ID sản phẩm */id === product.id) {
                // Trả về Object mới với giá đã cập nhật
                return { ...product, price: newPrice};
            }

            // Trả về sản phẩm cũ
            return product;
        });
    });
}
    return(
        <>
        <div>
            <button onClick={addProduct}>
                Add Product
            </button>
            <div>
                {hienThiSanPham}
                {/* Hiển thị danh sách sản phẩm */}
            </div>
        </div>
        
        <input
        {/*// lấy giá trị name từ state*/}
            value={name}  
            onChange={(e) => setName(e.target.value)} 
        />
        <p>Tên đang nhập: {name}</p>
        <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
        />
        <p>Giá đang nhập: {price}</p>

        </>
    )    
}

export default App;
