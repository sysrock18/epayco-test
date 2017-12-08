import React from 'react';
import './Product.css';
import skate from '../assets/skate.jpg';

function Product() {
  return (
    <div className="container-product">
        <img src={skate} alt="Skate" className="img-product" />
        <div className="description">
          <h3>Skate Element</h3>
          <p>Precio: <b>50,000 COP</b></p>
        </div>
    </div>
  );
}

export default Product;
