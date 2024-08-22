import { createContext, useContext, useState } from 'react'

const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  const initialDetails = {
    name: '',
    phone: '',
    address: '',
    payment: 'cash',
  }
  const [orderDetails, setOrderDetails] = useState(initialDetails)

  const updateOrderDetails = (field, value) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }))
  }

  const clearOrderDetails = () => {
    setOrderDetails(initialDetails)
  }

  return (
    <OrderContext.Provider value={{ orderDetails, updateOrderDetails, clearOrderDetails }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => useContext(OrderContext)
