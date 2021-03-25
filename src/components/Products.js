import React, { Component } from 'react';
import Product from './Product';

class Products extends Component {
  render() {
    let products = this.props.products.map((product) => {
      return (
        <Product
          addVariantToCart={this.props.addVariantToCart}
          checkout={this.props.checkout}
          key={product.id.toString()}
          product={product}
        />
      );
    });

    return (
      <div className="container mt-md-5 mb-md-5">
      <div className="Product-wrapper">
      <table className="table table-bordered">
        <tr>
          <th>
            Product image
          </th>
          <th>
            Product Name
          </th>
          <th>
            Price
          </th>
          <th>
            Action
          </th>
        </tr>
        {products}
        </table>
      </div>
      </div>
    );
  }
}

export default Products;
