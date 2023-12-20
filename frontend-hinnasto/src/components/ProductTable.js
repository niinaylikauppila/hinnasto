import { ProductRow } from './ProductRow';

export const ProductTable = ({ products, openProductForEdit, handleDelete, onColumnHeaderClick }) => {
  return (
    <table className='table align-middle'>
      <thead>
        <tr>
          <th style={{ cursor: 'pointer' }} onClick={() => onColumnHeaderClick('name')}>Nimi </th>
          <th style={{ cursor: 'pointer' }} onClick={() => onColumnHeaderClick('price')}> Hinta €</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow
            key={product.name}
            product={product}
            openProductForEdit={openProductForEdit}
            handleDelete={handleDelete} />
        ))}
      </tbody>
    </table>
  );
};
