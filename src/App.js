import React, { useState } from "react";
import "./App.css";
import "./Style.css";

const App = () => {
  const [products, setProducts] = useState([
    { productName: "", productPrice: "", qty: "", total: 0 },
  ]);
  const [grandTotal, setGrandTotal] = useState(0);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    newProducts[index].total =
      parseFloat(newProducts[index].productPrice) *
        parseInt(newProducts[index].qty) || 0;
    setProducts(newProducts);

    const total = newProducts.reduce((acc, product) => acc + product.total, 0);
    setGrandTotal(total);
  };

  const handleAddRow = () => {
    setProducts([
      ...products,
      { productName: "", productPrice: "", qty: "", total: 0 },
    ]);
  };

  const handleDeleteRow = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);

    const total = newProducts.reduce((acc, product) => acc + product.total, 0);
    setGrandTotal(total);
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-4" onClick={handleAddRow}>
        <b>New</b>
      </button>
      <table className="table mb-4">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="productName"
                  value={product.productName}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  name="productPrice"
                  value={product.productPrice}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  name="qty"
                  value={product.qty}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={product.total.toFixed(2)}
                />
              </td>
              {index === products.length - 1 && products.length > 1 && (
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteRow(index)}
                  >
                    <b>Delete</b>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {products.length > 0 && (
        <div className="d-flex justify-content-end">
          <label className="mr-2"><b>Grand Total</b></label>
          <input
            className="form-control"
            type="text"
            readOnly
            value={grandTotal.toFixed(2)}
          />
        </div>
      )}
    </div>
  );
};

export default App;
