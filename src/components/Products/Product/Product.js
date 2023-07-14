import styles from './Product.module.scss';


import PropTypes from 'prop-types';
import { useState, useMemo } from "react";
import ProductImage from './ProductImage/ProductImage';
import ProductForm from './ProductForm/ProductForm';

const Product = props => {
  const {name, title, basePrice, colors, sizes} = props;
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);
  const prepareColorClassName = color => {
    return styles['color' + color[0].toUpperCase() + color.substr(1).toLowerCase()];
  }
  const getPrice = useMemo(() => {
    const additionalPrice = sizes.find(size => size.name === currentSize).additionalPrice;
    return basePrice + additionalPrice}, [currentSize, sizes, basePrice]);

  const addToCart = event => {
    event.preventDefault();
    const summary = {
      Name: title,
      Size: currentSize,
      Price: getPrice,
      Color: currentColor,
    }

    console.log('Product Summary:', summary);
  };

  return (
    <article className={styles.product}>
      <ProductImage name={name} title={title} currentColor={currentColor} />
      <div>
        <header>
          <h2 className={styles.name}>{title}</h2>
          <span className={styles.price}>{getPrice}$</span>
        </header>
        <ProductForm addToCart={addToCart} sizes={sizes}
          currentSize={currentSize} setCurrentSize={setCurrentSize}
          colors={colors} prepareColorClassName={prepareColorClassName}
          currentColor={currentColor} setCurrentColor={setCurrentColor} />
      </div>
    </article>
  )
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
  sizes: PropTypes.array.isRequired,
};

export default Product;