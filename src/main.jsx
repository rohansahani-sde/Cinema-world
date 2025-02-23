import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Skeleton from './components/Skeleton.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    {/* <Navbar /> */}
    <App />
    {/* <Footer/> */}
    {/* <Skeleton/> */}
    {/* <Movie /> */}
    {/* <TrendingMovies/> */}
    {/* <Series /> */}
    {/* <Movie/> */}
    {/* <Tvshow/> */}
  </StrictMode>,
)
