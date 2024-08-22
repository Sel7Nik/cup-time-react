import Modal from 'react-modal'
import { API_URL } from '../../const'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import style from './ProductModal.module.css'

Modal.setAppElement('#root')

export const ProductModal = ({ isOpen, onRequestClose, props }) => {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  if (!props) {
    return null
  }
  const images = `${API_URL}${props.img}`
  const title = props.title
  const price = props.price

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }
  const handleAddToCart = () => {
    addToCart(props, quantity)
    onRequestClose()
    //
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={style.modal}
      overlayClassName={style.overlay}
      contentLabel="Product Modal"
    >
      <article className={style.product}>
        <img className={style.image} src={images} alt={title} />

        <div className={style.content}>
          <div className={style.header}>
            <h3 className={style.title}>{title}</h3>
            <p className={style.price}>{price}&nbsp;₽</p>
          </div>
          <ul className={style.list}>
            {Object.entries(props.additional).map(([key, value]) => (
              <li className={style.item} key={key}>
                <span className={style.field}>{key}:</span>
                <span className={style.value}>{value}</span>
              </li>
            ))}
          </ul>
          <div className={style.footer}>
            <div className={style.count}>
              <button className={style.btn} onClick={handleDecrease}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect x="0.5" y="0.5" width="35" height="35" rx="3.5" stroke="#B8B8B8" />
                  <rect x="12" y="17" width="12" height="2" fill="#1D1C1D" />
                </svg>
              </button>
              <input className={style.number} type="number" value={quantity} readOnly />
              <button className={style.btn} onClick={handleIncrease}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect x="0.5" y="0.5" width="35" height="35" rx="3.5" stroke="#B8B8B8" />
                  <rect x="12" y="17.25" width="12" height="1.5" fill="#1D1C1D" />
                  <rect x="17.25" y="24" width="12" height="1.5" transform="rotate(-90 17.25 24)" fill="#1D1C1D" />
                </svg>
              </button>
            </div>
            <button className={style.btnAddCart} onClick={handleAddToCart}>
              В КОРЗИНУ
            </button>
          </div>
        </div>

        <button className={style.btnCloseCard} onClick={onRequestClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="5.71228"
              y="14.1975"
              width="12"
              height="1.5"
              transform="rotate(-45 5.71228 14.1975)"
              fill="#B8B8B8"
            />
            <rect
              x="14.1976"
              y="15.2582"
              width="12"
              height="1.5"
              transform="rotate(-135 14.1976 15.2582)"
              fill="#B8B8B8"
            />
          </svg>
        </button>
      </article>
    </Modal>
  )
}
