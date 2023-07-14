import styles from './Product.module.scss';
import clsx from 'clsx';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useState } from "react";
import shortid from 'shortid';

const Product = props => {
  const {name, title, basePrice, colors, sizes} = props;
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);
  const prepareColorClassName = color => {
    return styles['color' + color[0].toUpperCase() + color.substr(1).toLowerCase()];
  }
  const getPrice = () => {
    const additionalPrice = sizes.find(size => size.name === currentSize).additionalPrice;
    return basePrice + additionalPrice;
  };

  const addToCart = event => {
    event.preventDefault();
    const summary = {
      Name: title,
      Size: currentSize,
      Price: getPrice(),
      Color: currentColor,
    }

    console.log('Product Summary:', summary);
  };

  return (
    <article className={styles.product}>
      <div className={styles.imageContainer}>
        <img 
          className={styles.image}
          alt={'${title}'}
          src={`${process.env.PUBLIC_URL}/images/products/shirt-${name}--${currentColor}.jpg`} />
      </div>
      <div>
        <header>
          <h2 className={styles.name}>{title}</h2>
          <span className={styles.price}>{getPrice()}$</span>
        </header>
        <form onSubmit={addToCart}>
          <div className={styles.sizes}>
            <h3 className={styles.optionLabel}>Sizes</h3>
            <ul className={styles.choices}>
            {sizes.map((size) => (
                <li key={shortid()}>
                  <button
                    type="button"
                    className={clsx(size.name === currentSize && styles.active)}
                    onClick={() => setCurrentSize(size.name)}
                  >
                    {size.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.colors}>
            <h3 className={styles.optionLabel}>Colors</h3>
            <ul className={styles.choices}>
            {colors.map((color) => (
                <li key={color}>
                  <button
                    type="button"
                    className={clsx(prepareColorClassName(color), color === currentColor && styles.active)}
                    onClick={() => setCurrentColor(color)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <Button className={styles.button}>
            <span className="fa fa-shopping-cart" />
          </Button>
        </form>
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