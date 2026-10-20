import { useRef, useState } from 'react'
import './App.css'

const initialProducts = [
  { id: 1, name: 'Laptop Dell', price: 20000000 },
  { id: 2, name: 'Mouse', price: 200000 },
]
const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price)

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [editingId, setEditingId] = useState(null)
  const nameInput = useRef(null)

  function resetForm() {
    setName('')
    setPrice('')
    setEditingId(null)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedName = name.trim()
    const numericPrice = Number(price)
    if (!trimmedName || price === '' || !Number.isFinite(numericPrice) || numericPrice < 0) return
    if (editingId !== null) {
      setProducts((current) => current.map((product) =>
        product.id === editingId ? { ...product, name: trimmedName, price: numericPrice } : product,
      ))
    } else {
      setProducts((current) => [...current, { id: crypto.randomUUID(), name: trimmedName, price: numericPrice }])
    }
    resetForm()
    nameInput.current.focus()
  }

  function editProduct(product) {
    setEditingId(product.id)
    setName(product.name)
    setPrice(String(product.price))
    nameInput.current.focus()
  }

  function deleteProduct(id) {
    setProducts((current) => current.filter((product) => product.id !== id))
    if (editingId === id) resetForm()
  }

  return (
    <main className="product-manager">
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="product-name">Tên sản phẩm</label>
          <input ref={nameInput} id="product-name" placeholder="Nhập tên sản phẩm"
            value={name} onChange={(event) => setName(event.target.value)} required
            pattern={'.*\\S.*'} title="Vui lòng nhập tên sản phẩm, không chỉ khoảng trắng." />
          <p className="input-preview">Tên đang nhập: {name}</p>
        </div>
        <div className="form-field">
          <label htmlFor="product-price">Giá sản phẩm (VNĐ)</label>
          <input id="product-price" type="number" min="0" step="1" placeholder="Nhập giá sản phẩm"
            value={price} onChange={(event) => setPrice(event.target.value)} required />
          <p className="input-preview">Giá đang nhập: {price !== '' ? `${formatPrice(Number(price))} VNĐ` : ''}</p>
        </div>
        <div className="form-actions">
          <button className="primary-button" type="submit">
            {editingId === null && <span className="plus-icon" aria-hidden="true">+</span>}
            {editingId === null ? 'Add Product' : 'Save Product'}
          </button>
          {editingId !== null && <button type="button" onClick={resetForm}>Cancel</button>}
        </div>
      </form>
      <section className="product-list" aria-label="Danh sách sản phẩm">
        {products.length === 0 && <p className="empty-message">Chưa có sản phẩm. Hãy thêm sản phẩm đầu tiên.</p>}
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: {formatPrice(product.price)} VNĐ</p>
            <div className="product-actions">
              <button type="button" onClick={() => deleteProduct(product.id)} aria-label={`Delete ${product.name}`}>Delete</button>
              <button type="button" onClick={() => editProduct(product)} aria-label={`Update ${product.name}`}>Update</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
