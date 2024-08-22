import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useProduct } from '../context/ProductContext'
import { useState } from 'react'
// import { useState } from 'react'

export const Header = () => {
  const location = useLocation()
  const { cart } = useCart()
  const { categories } = useProduct()
  const [isMenuOpen, setIsOpenMenu] = useState(false)

  const closeMenu = () => {
    setIsOpenMenu(false)
  }

  const openMenu = () => {
    setIsOpenMenu(true)
  }

  // const totalProducts = cart.length
  const summaryProducts = cart ? cart.reduce((accum, item) => item.quantity + accum, 0) : 0

  const getActiveClass = (category) => {
    const currentCategory = new URLSearchParams(location.search).get('category')
    return currentCategory === category ? 'active' : ''
  }
  return (
    <header className="header">
      <div className="container header__container">
        <Link className="logo-link header__logo-link" to="/">
          <img className="logo-img" src="images/logo.svg" alt="logo-svg Cup Time" />
        </Link>
        <nav className={`nav header__nav ${isMenuOpen ? 'header__nav_active active' : ''}`}>
          <ul className="menu header__menu">
            {Object.entries(categories).map(([key, value]) => (
              <li key={key} className="header__menu-item menu-item">
                <Link
                  className={`header__menu-link menu-link ${getActiveClass(key)}`}
                  to={`/products?category=${key}`}
                  onClick={closeMenu}
                >
                  {value}
                </Link>
              </li>
            ))}
          </ul>
          <button className="header__close-btn" onClick={closeMenu}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="7.28174"
                y="7.07532"
                width="20"
                height="1"
                transform="rotate(45 7.28174 7.07532)"
                fill="#D9D9D9"
              />
              <rect
                x="6.5752"
                y="21.2173"
                width="20"
                height="1"
                transform="rotate(-45 6.5752 21.2173)"
                fill="#D9D9D9"
              />
            </svg>
          </button>
        </nav>
        <Link className="header__cart-link" to="/cart">
          {summaryProducts}
        </Link>
      </div>
      <div className="header__control">
        <Link className="header__cart-link" to="cart">
          {cart ? cart.reduce((acc, item) => item.quantity + acc, 0) : 0}
        </Link>

        <button className="header__burger" aria-label="Открыть меню" onClick={openMenu}>
          <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="9.5" width="20" height="1" fill="#D9D9D9" />
            <rect x="4" y="14.5" width="20" height="1" fill="#D9D9D9" />
            <rect x="4" y="19.5" width="20" height="1" fill="#D9D9D9" />
          </svg>
        </button>
      </div>
    </header>
  )
}
