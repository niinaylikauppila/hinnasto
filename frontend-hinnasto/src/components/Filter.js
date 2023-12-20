export const Filter = ({ findProduct, handleFind }) => {
  return (
    <form onSubmit={handleFind} className='d-flex align-items-center'>
      <label className='pe-2'>etsi:</label>
      <input className='form-control'
        value={findProduct}
        onChange={handleFind} />
    </form>
  );
};
