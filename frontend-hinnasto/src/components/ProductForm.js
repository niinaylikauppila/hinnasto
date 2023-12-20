export const ProductForm = ({ product, handleProductChange, saveProduct }) => {

  const handleName = (event) => {
    handleProductChange({ ...product, name: event.target.value });
  };
  const handlePrice = (event) => {
    handleProductChange({ ...product, price: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    saveProduct(product);
  };

  return (
    <form className='' onSubmit={handleSubmit}>

      <div className='mb-2'>
        <div className="row mb-1">
          <label className="text-end col-2 col-form-label" htmlFor='productName'>Nimi</label>
          <div className='col-10'>
            <input className='form-control'
              type='text' required
              minLength='4'
              value={product.name}
              id='productName'
              placeholder=' '
              onChange={handleName} />
          </div>
        </div>
        <div className="row">
          <label className="text-end col-2 col-form-label" htmlFor='productPrice'>Hinta</label>
          <div className='col-10'>
            <input className='form-control'
              type='number' required
              min='0'
              step='0.01'
              value={product.price}
              id='productPrice'
              placeholder=' '
              onChange={handlePrice} />
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <button className='btn btn-outline-primary' type="submit">Tallenna</button>
      </div>
    </form>
  );
};
