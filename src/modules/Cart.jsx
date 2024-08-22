import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { CartItem } from './CartItem'
import { SkeletonLoader } from './SkeletonLoader'
import { useOrder } from '../context/OrderContext'
import { API_URL } from '../../const'
import Modal from 'react-modal'

Modal.setAppElement('#root')

export const Cart = () => {
  const [orderStatus, setOrderStatus] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { cart, clearCart } = useCart()
  const { orderDetails, clearOrderDetails } = useOrder()

  const handleSubmit = async () => {
    const orderData = {
      ...orderDetails,
      items: cart.map(({ id, quantity }) => ({ id, quantity })),
    }
    console.log('orderData: ', orderData)

    try {
      const response = await fetch(`${API_URL}/api/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Ошибка при отправке заказа')
      }

      const result = await response.json()
      setOrderStatus('success')
      setOrderId(result.order.id)
      clearCart()
      clearOrderDetails()
    } catch (error) {
      setOrderStatus('error')
      console.error(`Ошибка: ${error}`)
    } finally {
      setModalIsOpen(true)
    }
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }

  const totalPrice = cart ? cart.reduce((accum, item) => accum + item.quantity * item.price, 0) : 0
  // const totalProducts = cart.length
  const summaryProducts = cart.reduce((accum, item) => item.quantity + accum, 0)

  return (
    <section className="cart">
      <div className="container cart__container">
        <h2 className="cart__title">Корзина ({cart ? summaryProducts : 0})</h2>

        <ul className="cart__list">
          {cart ? (
            cart.map((item) => {
              return <CartItem key={item.id} props={item} />
            })
          ) : (
            <SkeletonLoader />
          )}
        </ul>

        <div className="cart__summury">
          <h3 className="cart__summury-title">Итого:</h3>
          <p className="cart__summury-total">{totalPrice}&nbsp;₽</p>
          <button className="cart__order-btn" onClick={handleSubmit}>
            Заказать
          </button>
        </div>
      </div>
      <Modal
        className="modal-cart"
        overlayClassName="modal-cart__overlay"
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
      >
        <h2 className="modal-cart__title">
          {orderStatus === 'success'
            ? `Заказ успешно отправлен! Номер вашего заказа: ${orderId}`
            : 'Произошла ошибка при отправке заказа'}
        </h2>
        <button className="modal-cart__button" onClick={closeModal}>
          Закрыть
        </button>
      </Modal>
    </section>
  )
}
