import styles from './ProductImage.module.scss';
import PropTypes from 'prop-types';

const ProductImage = ({title, name, currentColor}) => {
    return (
        <div className={styles.imageContainer}>
        <img 
          className={styles.image}
          alt={title}
          src={`${process.env.PUBLIC_URL}/images/products/shirt-${name}--${currentColor}.jpg`} 
        />
      </div>
    );
};


ProductImage.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    CurrentColor: PropTypes.string.isRequired,
  };



export default ProductImage;