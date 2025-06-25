import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import instance from '../utils/axios';
import Card from './Card';

// const Category = ( {category} ) => {
const Category = ( ) => {

    const {category } = useParams();
    // const category = "now_playing"
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(3);
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
            // setMovies(prev => [...prev,...data]);
            setMovies(data);
            console.log(data);
        }catch(err){
            console.log("Not fetch by category", err);
        }finally{
            setLoading(false);
        }
        
    }

    useEffect(() =>{
        fetchCategory();
    },[category])
    
    
  return (
    <>

    
    <div className="grid pt-10 bg-black gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {
            loading ? <div>no....</div> : 
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
                    source={data?.vote_average}
                    date={new Date(data?.release_date).toLocaleDateString()}
                    />
                </Link> 
            ))
        }
    </div>
    </>
  )
}

export default Category