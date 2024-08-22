import { Header } from './modules/Header'
import { Footer } from './modules/Footer'
import Main from './modules/Main'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  )
}

export default App
