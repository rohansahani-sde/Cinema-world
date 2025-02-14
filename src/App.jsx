import React from 'react'
// import {getData} from './store'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Series from './components/Series.jsx'
import TvShow from './components/Tvshow.jsx'
import Movie from './components/Movie'
import Navbar from './components/Navbar'
import Home from './components/Home.jsx'
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
        <Route path="/series" element={<Series />} />
        <Route path="/tvshow" element={<TvShow />} />
        <Route path="/movies" element={<Movie />} />
      </Routes>
    </BrowserRouter>
    </>
    // <div className=''>
    //   <h1 className='bg-red-600 flex justify-center py-2 text-3xl font-light '>Netflix Movies</h1>
    //   <div className='flex justify-center bg-red-600  font-light'>
    //   {/* input section */}
    //   <label for="lang">Choose Language :</label>
    // <select id="lang"
    // onClick={(e)=> setLang(e.target.value)}
    // >
    //   <option value="en-US">English</option>
    //   <option value="hi">Hindi</option>
    //   <option value="fr">French</option>
    //   <option value="es">Spanish</option>
    // </select>
    // {/* <input type="text" placeholder='search'
    // onChange={(e)=> setLang(e.target.value)}
    //  name="" id="" /> */}
    //   </div>
    // {/* movies lists */}
    //   {movie.length > 0 ? (<>
    //   <div className=' flex flex-wrap gap-5 justify-center bg-black text-white '>
    //   {movie.map((movie ) => (
    //     <div className='flex-wrap text-center border rounded-xl w-64' key={movie.id}>
    //       {/* <div> */}

    //       <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
    //       className='w-full rounded-t-xl'
    //       alt={movie.title} />
    //       <h2 className='text-center text-xl font-extralight'>{movie.title}</h2>
    //       <h2>Release : {movie.release_date}</h2>
    //       {/* </div> */}

    //     </div>
    //   ))}
    //   </div>
    //   </>) :(<>
    //   <h1>Movies not found</h1>
    //   </>)}
    //   <div className='flex justify-center items-baseline bg-red-600 pt-2'>
    //     <button onClick={()=> setPage(page-1)}
    //       className='border  m-1 px-2 rounded-lg'>Previous</button>
    //     <span> page : {page} </span>
    //     <button onClick={()=>setPage(page+1)}
    //       className='border  m-1 px-2 rounded-lg'>Next</button>
    //   </div>
    //   {/* <Series /> */}
    // </div>
  )
}

export default App





// import {getSeries} from '../store'
// import {getVideo} from '../store'

// const Series = () => {
//     const [search , setSearch] = useState('marvel')
//     const [series, setSeries] = useState([])
//     const [page , setPage] = useState(1)
//     const [video, setVideo] = useState(null)

//     useEffect(()=>{
//         async function fetchSeries() {
//             const data = await getSeries(search,page)
//             setSeries(data.results || [])
//         }
//         fetchSeries()
//     },[search,page])

//     async function fetchVideo(SeriesId){
//         const data = await getVideo(SeriesId)
//         if(data.results.length > 0){
//             const url = `https://www.youtube.com/embed/${data.results[0].key}`   
//             window.open(url, '_blank')
//         }else{
//             alert(' No trailer available ')
//         }
//     }
    
//   return (
//     <div>
//         <h1 className="text-center text-3xl font-bold mb-4">Series</h1> 
//         <input 
//         type="text" 
//         placeholder='Search Series...' 
//         value={search} 
//         onChange={(e) => setSearch(e.target.value)} 
//         className="w-full max-w-md mx-auto p-2 border border-gray-400 rounded-lg text-black"
//         />

//         <div className='flex flex-wrap gap-5 justify-center mt-5'>
//         {series.length > 0 ? (<>
        
//         <div className='flex flex-wrap gap-5 justify-center bg-black text-white'> 

//         {series.map((series) =>(
//             <div key={series.id} className='flex-wrap text-center border rounded-xl w-64'>
//                 <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} 
//           className='w-full rounded-t-xl'
//           alt={series.name} />
//           <h3 className='flex flex-wrap justify-center'>{series.name}</h3>
//           <button
//           className='border-b-2 border-t border-cyan-400 hover:scale-105 duration-300 mb-2 hover:bg-cyan-400 hover:text-black font-semibold rounded-xl p-1 ' 
//           onClick={()=> fetchVideo(series.id)}> 
//           <a href={video}>📺Watch Trailer</a></button>
//           </div>
//         ))}
//         </div>
//         </>):(<>
//         <p>no series found</p>
//         </>)}
        
//         </div>
//         <div className='text-xl flex justify-center text-white items-center gap-3 py-4 bg-black'>
//             <button onClick={()=>  setPage(Math.max(1,page-1))}
//             className='border-b-2 border-t-2 hover:bg-cyan-400 hover:text-black duration-300 hover:scale-105 rounded-xl p-2'
//             >⏮️ prev</button>
//             <span > 📄 : {page} </span>
//             <button onClick={()=>setPage(page+1)}
//             className='border-b-2 border-t-2 hover:bg-cyan-400 hover:text-black duration-300 hover:scale-105 rounded-xl p-2'
//             >next ⏭️</button>
//         </div>
//     </div>
//   )
// }

// export default Series