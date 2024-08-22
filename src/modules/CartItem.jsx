import { useState } from 'react'
import { API_URL } from '../../const'
import { useCart } from '../context/CartContext'

export const CartItem = ({ props }) => {
  const [itemQuantity, setItemQuantity] = useState(props.quantity)
  const { updateQuantity } = useCart()

  const handleDecrease = () => {
    const newQuantity = itemQuantity - 1
    if (newQuantity > 0) {
      setItemQuantity(newQuantity)
      updateQuantity(props.id, newQuantity)
    } else {
      updateQuantity(props.id, 0)
    }
  }
  const handleIncrease = () => {
    const newQuantity = itemQuantity + 1
    setItemQuantity(newQuantity)
    updateQuantity(props.id, newQuantity)
  }

  return (
    <li className="cart__item cart-item">
      <article className="cart-item__card">
        <img className="cart-item__image" src={`${API_URL}${props.img}`} alt={props.title} />
        <div className="cart-item__content">
          <h3 className="cart-item__title">{props.title}</h3>
          <div className="cart-item__quantity">
            <button className="cart-item__quantity-btn cart-item__quantity-btn_minus" onClick={handleDecrease}></button>
            <input className="cart-item__quantity-input" type="number" value={props.quantity} readOnly />
            <button className="cart-item__quantity-btn cart-item__quantity-btn_plus" onClick={handleIncrease}></button>
          </div>
          <p className="cart-item__price">{props.price * props.quantity}&nbsp;₽</p>
        </div>
      </article>
    </li>
  )
}
