import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter } from './components/Filter'
import { ProductForm } from './components/ProductForm'
import { ProductTable } from './components/ProductTable'

const App = () => {

  const [products, setProducts] = useState([])
  const [findProduct, setFindProduct] = useState('')
  const EMPTY_FORM_PRODUCT = { name: '', price: '' }
  const [formProduct, setFormProduct] = useState(EMPTY_FORM_PRODUCT)
  const [sortOption, setSortOption] = useState('price')
  const [isEditMode, setIsEditMode] = useState(false)


  const handleFind = (event) => {
    setFindProduct(event.target.value)
  }
  const openProductForEdit = (product) => {
    setFormProduct(product)
    setIsEditMode(true)
  }

  useEffect(() => {
    axios.get('http://localhost:3003/api/products')
      .then(response => {
        setProducts(response.data)
      })
  }, [])


  const saveProduct = (product) => {
    console.log(product)
    if (product.id) {
      axios.put(`http://localhost:3003/api/products/${product.id}`, product)
        .then(response => {
          setProducts(products.map(p => p.id !== product.id ? p : response.data))
          setFormProduct({ ...EMPTY_FORM_PRODUCT })
          setIsEditMode(false)
        })
    } else {
      axios.post('http://localhost:3003/api/products', product)
        .then(response => {
          console.log(response, product)
          setProducts(products.concat(response.data))
          setFormProduct({ ...EMPTY_FORM_PRODUCT })
          setIsEditMode(false)
        })
    }
  }
  const deleteProduct = (product) => {
    if (window.confirm('Haluatko poistaa tuotteen?'))
      axios.delete(`http://localhost:3003/products/${product.id}`)
        .then(() => {
          setProducts(products.filter(p => p.id !== product.id))
        })
  }

  const createSortFunction = () => {
    if (sortOption === 'name') return (a, b) => a.name.localeCompare(b.name)
    if (sortOption === 'price') return (a, b) => a.price - b.price
    throw new Error('Unkown SortOption')
  }

  const filteredAndSortedProducts = products
    .filter(p => p.name.toLowerCase().includes(findProduct.toLowerCase()))
    .sort(createSortFunction())


  return (
    <div className='min-vh-100'>
    <div className='bg-white container' >
      <div className='d-flex justify-content-between align-items-center border-bottom mb-3 py-3'>
        <h1 className=''>Hinnasto</h1>
        <Filter
          findProduct={findProduct}
          handleFind={handleFind}
        />
      </div>
      <div className='d-flex flex-column flex-md-row'>
        <div className='order-md-2 w-100 ms-md-3'>
        <h3>{isEditMode ? 'Muokkaa' : 'Lisää tuote'}</h3>
          <ProductForm
            product={formProduct}
            handleProductChange={setFormProduct}
            saveProduct={saveProduct}
          />
        </div>
        <div className='w-100'>
          <ProductTable
            openProductForEdit={openProductForEdit}
            products={filteredAndSortedProducts} //{setProducts}
            handleDelete={deleteProduct}
            onColumnHeaderClick={setSortOption}
          />
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
