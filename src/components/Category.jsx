import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import instance from '../utils/axios';
import Card from './Card';
import Loading from './Loading';
import { FaDownLong, FaUpDown } from 'react-icons/fa6';
import { FaArrowDown } from 'react-icons/fa';
import Footer from './Footer';

// const Category = ( {category} ) => {
const Category = ( ) => {

    const {category } = useParams();
    // const category = "now_playing"
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchCategory = async () => {

        try{
            setLoading(true);
            const res = await instance.get(`/movie/${category}`, {
                params: {
                    api_key: import.meta.env.VITE_TMDB_API_KEY,
                    page: page,
                }
            });
            const data = res.data.results;
            setMovies(prev => [...prev,...data]);
            // setMovies(data);
            // console.log(data);
        }catch(err){
            console.log("Not fetch by category", err);
        }finally{
            setLoading(false);
        }
        
    }

    useEffect(() => {
    setMovies([]);  // clear previous category's movies
    setPage(1);  
    fetchCategory();   // this will trigger page-based fetch
}, [category]);

    // load more data
    useEffect(() =>{
        fetchCategory();
    },[category, page])
    
    
  return (
    <>
    <div className=' bg-black'>
        {
            loading && movies.length ==0  ? <Loading /> :
            <div className="grid pt-10 bg-black gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {

                movies.map( (data, idx) =>(
                    <Link to={`/details/${encodeURIComponent(data?.title)}`} 
                    key={idx}
                    state={{data}}
                    className='block' >
                        <Card 
                        key={idx}
                        title={data?.title}
                        description={data?.overview}
                        urlToImage={`https://image.tmdb.org/t/p/w500${data?.poster_path || data?.backdrop_path}`}
                        rating={data?.vote_average}
                        date={new Date(data?.release_date).toLocaleDateString()}
                        />
                    </Link> 
                ))
            }
            </div>
        }
    <div className='flex justify-center pt-8 p-4'>

        <button className='text-black flex items-center gap-2 rounded-lg p-2 px-4 bg-amber-500'
         onClick={ () => setPage(page+1)}>Load More <FaArrowDown className=' animate-bounce' /> </button>
    </div>

    </div>

    <Footer />

    

    </>
  )
}

export default Category