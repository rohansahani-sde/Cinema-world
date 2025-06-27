import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Skeleton from './components/Skeleton.jsx'
import Footer from './components/Footer.jsx'
import Card from './component/Card.jsx'
import Trending from './component/Trending.jsx'
import Adventure from './component/Adventure.jsx'
import Home from './Home.jsx'
import Navbar from './components/Navbar.jsx'
import Category from './components/Category.jsx'
import Loading from './components/Loading.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    
    
    
    <App />
    {/* <Loading /> */}
    {/* <Category/> */}
    
    {/* <Home /> */}
    {/* <Footer/> */}
    {/* <Skeleton/> */}
    {/* <Movie /> */}
    {/* <TrendingMovies/> */}
    {/* <Series /> */}
    {/* <Movie/> */}
    {/* <Tvshow/> */}
  </StrictMode>,
)
