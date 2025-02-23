import React, {  useEffect, useState } from 'react'
import {getMovies} from '../store'
import Skeleton from './Skeleton'

const Movie = () => {

  const [movie, setMovie] = useState([])
  const [lang , setLang] = useState('en-US')
  const [page , setPage] = useState(1)
  const [sort, setSort] = useState('trending')

  async function fetchMovie() {
    const data = await getMovies(lang, page,sort);
    if(data && data.results){
      setMovie(data.results)
    }
  }
  useEffect(()=>{
    const delay = setTimeout(() => {
      fetchMovie()
    }, 500);
    return ()=> clearInterval(delay)
  },[lang,page,sort])



  return (
    <div className='mt-16'>
      <h1 className='bg-red-600 flex justify-center py-2 text-3xl font-light '>Netflix Movies</h1>
      <div className='flex justify-center bg-red-600  font-light'>
      {/* input section */}
      <label htmlFor="lang">Choose Language :</label>
    <select id="lang"
    onClick={(e)=> setLang(e.target.value)}
    >
      <option value="en-US">English</option>
      <option value="hi">Hindi</option>
      <option value="fr">French</option>
      <option value="es">Spanish</option>
    </select>
    <select name="" id="" onClick={(e)=>setSort(e.target.value)}>
        <option value="trending">Trending</option>
        <option value="popularity">Popular</option>
    </select>
      </div>

    {/* movies lists */}
      {movie.length > 0 ? (<>
      <div className='pt-4 flex flex-wrap md:gap-5 gap-3 justify-center bg-black text-white '>
      {movie.map((movie ) => (
        <div className='flex-wrap text-center border rounded-xl sm:w-64 w-40' key={movie.id}>
          {/* <div> */}

          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          className='w-full rounded-t-xl'
          alt={movie.name} />
          <h2 className='text-center text-xl font-extralight'>{movie.title}</h2>
          <h2>Release : {movie.release_date}</h2>
        </div>
      ))}
      </div>
      </>) :(<> 
      {/* skeleton loader */}
        {/* <div className="flex-wrap text-center border rounded-xl sm:w-64 w-40 animate-pulse">
          <div className="w-full h-60 bg-gray-300 rounded-t-xl"></div>
          <h2 className="text-center text-xl font-extralight bg-gray-300 h-6 w-3/4 mx-auto mt-2 rounded"></h2>
          <h2 className="bg-gray-300 h-4 w-1/2 mx-auto mt-1 rounded"></h2>
          </div> */}
          <Skeleton/>

      </>)}
      <div className='flex justify-center items-baseline bg-red-600 pt-2'>
        <button 
        onClick={()=> setPage(Math.max(1,page-1)) }
          className='border  m-1 px-2 rounded-lg'>Previous</button>
        <span> page : {page} </span>
        <button onClick={()=>setPage(page+1)}
          className='border  m-1 px-2 rounded-lg'>Next</button>
      </div>
    </div>
  )
}

export default Movie