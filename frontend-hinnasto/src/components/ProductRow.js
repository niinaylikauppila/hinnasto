
export const ProductRow = ({ product, openProductForEdit, handleDelete }) => {
  return (
    <tr key={product.name}>
      <td>
        {product.name}
      </td>
      <td>
        {product.price}
      </td>
      <td>
        <button className='btn btn-outline-secondary'
          onClick={() => openProductForEdit(product)}>
          <i className="bi bi-pencil"></i>
        </button>
        <button className='btn btn-outline-danger'
          onClick={() => handleDelete(product)}>
          <i className="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  );
};
