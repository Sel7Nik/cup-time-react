import { useState } from 'react'
import { API_URL } from '/const'
import { ProductModal } from './ProductModal'

const Product = ({ props }) => {
  const images = `${API_URL}${props.img}`
  const title = props.title
  const price = props.price

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = (event) => {
    event.preventDefault()
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <li className="products__item">
      <a className="product__link" href="#" onClick={openModal} aria-label={`Открыть для ${title}`}>
        <article className="product">
          <img className="product__image" src={images} alt={title} />
          <div className="product__content">
            <h3 className="product__title">{title}</h3>
            <p className="product__price">{price} ₽</p>
          </div>
        </article>
      </a>
      <ProductModal isOpen={modalIsOpen} onRequestClose={closeModal} props={props} />
    </li>
  )
}

export default Product
