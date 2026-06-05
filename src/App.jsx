import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Series from './components/Series.jsx'
import TvShow from './components/Tvshow.jsx'
import Movie from './components/Movie'
import Navbar from './components/Navbar'
import Home from './Home.jsx'
import Footer from './components/Footer.jsx'
import Details from './pages/Details.jsx'
import Search from './pages/Search.jsx'
import Category from './components/Category.jsx'
import Landing from './pages/Landing.jsx'
import Favorites from './pages/Favorites.jsx'

import ThemeProvider from './components/ThemeProvider.jsx'
import { ToastProvider } from './components/ToastContext'
import Toast from './components/Toast'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/movies" element={<Movie />} />
                <Route path="/series" element={<Series />} />
                <Route path="/tvshow" element={<TvShow />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/search" element={<Search />} />
                <Route path="/movie/:category" element={<Category />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTop />
            <Toast />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App




