import { useState } from "react";

function AddBookForm({onAddBook}) {
    // Khai báo hai State
    const [formData,setFormData] = useState({
        title:"",
        author:"",
        category:""
    }); 
    const[errors, setErrors] = useState({
        title: "",
        author: "",
        category:""
    });

    function handleChange(e){
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Xóa lỗi của Input đang được sửa
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    }

    function handleClear() {
        setFormData({
            title: "",
            author: "",
            category:""
        });
        setErrors({
            title: "",
            author: "",
            category:""
        });
    }

    function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {
        title: !formData.title.trim()
            ?"Vui lòng nhập tên sách"
            :"",
        author: !formData.author.trim()
            ?"Vui lòng nhập tên tác giả"
            :"",
        category: !formData.category
            ?"Vui lòng chọn thể loại"
            :""
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.author || newErrors.category) {
        return;
    }

    const newBook = {
    id: crypto.randomUUID(),
    title: formData.title.trim(),
    author: formData.author.trim(),
    category: formData.category.trim(),
    favorite: false
    };
    // 2. Gọi onAddBook(newBook)
    onAddBook(newBook);
    handleClear();
}

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h2>Thông tin sách</h2>

            {/* Input tên sách */}
            {/* Input tác giả */}
            <h2>Nhap ten sach</h2>
            <input
                name="title"
                type="text"
                placeholder="Nhập tên sách"
                value={formData.title}
                onChange={handleChange}
            />
            {errors.title && (
                <p style={{ color: "red" }}>
                    {errors.title}
                </p>
            )}
            <h2>Nhap ten tác giả</h2>
            <input
                name="author"
                type="text"
                placeholder="Nhập tên tác giả"
                value={formData.author}
                onChange={handleChange}
            />
            {errors.author && (
                <p style={{ color: "red" }}>
                    {errors.author}
                </p>
            )}
            <select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Chọn thể loại</option>
                <option value="Programming">Programming</option>
                <option value="Self-help">Self-help</option>
                <option value="Other">Other</option>
            </select>
            {errors.category && (
                <p style={{ color: "red" }}>
                    {errors.category}
                </p>
            )}
            <p>Tên sách đang nhập: {formData.title}</p>
            <p>Tên tác giả đang nhập: {formData.author}</p>
            <button type="button" onClick={() => handleClear()} >Xóa nội dung</button>
            <button type="submit">
                Thêm sách
            </button>
            </form>
        </div>
    );
}

export default AddBookForm;