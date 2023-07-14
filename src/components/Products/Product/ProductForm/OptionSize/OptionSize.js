import styles from '../ProductForm.module.scss';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import shortid from 'shortid';
import clsx from 'clsx';

const OptionSize = ({sizes, currentSize, setCurrentSize})=> {
    return (
        <div className={styles.sizes}>
            <h3 className={styles.optionLabel}>Sizes</h3>
            <ul className={styles.choices}>
            {sizes.map((size) => (
                <li key={shortid()}>
                  <Button
                    type="button"
                    className={clsx(size.name === currentSize && styles.active)}
                    onClick={() => setCurrentSize(size.name)}
                  >
                    {size.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
    )
}

OptionSize.propTypes = {
    sizes: PropTypes.array.isRequired,
    currentSize: PropTypes.string.isRequired,
    setCurrentSize: PropTypes.func.isRequired
}

export default OptionSize;