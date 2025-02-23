import React from 'react'
// import {getData} from './store'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Series from './components/Series.jsx'
import TvShow from './components/Tvshow.jsx'
import Movie from './components/Movie'
import Navbar from './components/Navbar'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
// import TrendingMovies from './components/TrendingMovies.jsx'
// import React, { useEffect, useState } from 'react'



// import Tvshow from './components/Tvshow'






// import Series from './components/Series'
// import Series from './components/Series'


const App = () => {

  // const [movie, setMovie] = useState([])
  // const [lang , setLang] = useState('en-US')
  // const [lang , setLang] = useState('')
  // const [page , setPage] = useState(1)
  // console.log(lang)
  // console.log(movie)

  // const lan = 'hindi'
  // const pgno = 2

  // useEffect(()=>{
  //   async function fetchData() {
  //     const data = await getData(lang, page);
  //     if(data && data.results){
  //       setMovie(data.results)
  //     }
  //   }
  //   fetchData()
  // },[lang,page])



  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/series" element={<Series />} />
        <Route path="/tvshow" element={<TvShow />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
    
  )
}

export default App


