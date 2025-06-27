import React, { useEffect, useState } from 'react'

import Skeleton from './components/Skeleton'
import { Link } from 'react-router-dom'
import instance from './utils/axios'
import Footer from './components/Footer'

const Home = () => {

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)


  // async function fetchData() {
    // const data = await getHomeData(page)
  //   // console.log(data.results)
  //   setMovies(data.results)
  // }
  const fetchData = async () =>{
    try{
      // setLoading(true);
      const res = await instance.get(`trending/movie/day`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          page: page,
        }
        });
        const data = res.data.results;
        // setMovies(prev => [...prev,...data]);
        setMovies(data);
        console.log(data);
        }catch(err){
          console.log("Not fetch by category", err);
        }
  }



  useEffect(() => {
    fetchData()
  },[page])







  
  return (
    <>
    <div className='pt-2 bg-black'>
      <div className='flex justify-center font-bold text-5xl my-4 border-b p-4 rounded-b-3xl'>
        <h1>
        Discover Your Next <span className='text-amber-300 animate-pulse'>Favorite 💖</span> Movie!
        </h1>
      </div>

  <div className="flex flex-wrap md:gap-5 gap-3 justify-center bg-black text-white">
    {movies.length > 0 ? 
    (
      movies.map((data, idx) => (
        <Link to={`/details/${encodeURIComponent(data?.title)}`} 
                        key={idx}
                        state={{data}}
                        className='block' >
                        
        
        <div 
        className='relative group flex-wrap text-center rounded-xl sm:w-64 w-40' key={data.id}>
            <img src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
            className='w-full hover:scale-105 duration-300 border border-amber-500 rounded-xl'
            alt={data.title} />
            <div className='absolute bottom-0 bg-black pb-4 bg-opacity-60 group-hover:scale-105 text-amber-300 hidden group-hover:block w-full h-28  transition-transform ease-in duration-300'>
            <h2 className='text-2xl font-semibold'>{data.title}</h2>
            <h2 className='text-xl font-light'>Release : {new Date(data.release_date).toLocaleDateString()}</h2>
            </div>
          </div>
          </Link>
        
      ))
    ) : 
    (
      <Skeleton />
    ) }
    {/* {movies.map((element) => (
      <div 
      className='relative group flex-wrap text-center rounded-xl sm:w-64 w-40' key={element.id}>
          <img src={`https://image.tmdb.org/t/p/w300${element.poster_path}`}
          className='w-full hover:scale-105 duration-300 border border-amber-500 rounded-xl'
          alt={element.title} />
          <div className='absolute bottom-0 bg-black pb-4 bg-opacity-60 group-hover:scale-105 text-amber-300 hidden group-hover:block w-full h-28  transition-transform ease-in duration-300'>
          <h2 className='text-2xl font-semibold'>{element.title}</h2>
          <h2 className='text-xl font-light'>Release : {new Date(element.release_date).toLocaleDateString()}</h2>
          </div>
        </div>
    ))} */}
  </div >
      {/* button for next and prev */}
      <div className='flex justify-center p-6'>
      <div className="join grid grid-cols-3">
        <button onClick={()=> setPage(Math.max(1,page-1))} 
        className="join-item btn btn-outline">Previous page</button>
        <button className="join-item bg-amber-600 bg-opacity-65">{page}</button>
        <button onClick={()=> setPage(page+1)}
        className="join-item btn btn-outline">Next</button>
      </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Home