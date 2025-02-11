import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import Series from './components/Series.jsx'
// import Movie from './components/Movie.jsx'
// import Navbar from './components/Navbar.jsx'
// import TrendingMovies from './components/TrendingMovies.jsx'
// import Tvshow from './components/Tvshow.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    {/* <Navbar /> */}
    <App />
    {/* <Movie /> */}
    {/* <TrendingMovies/> */}
    {/* <Series /> */}
    {/* <Movie/> */}
    {/* <Tvshow/> */}
  </StrictMode>,
)
