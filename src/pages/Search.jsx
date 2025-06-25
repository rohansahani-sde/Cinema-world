import React, { useEffect, useState } from 'react'
import instance from '../utils/axios';
import { Link, useFetcher, useLocation } from 'react-router-dom';
import Card from '../components/Card';

const Search = () => {

    
    const { search } = useLocation();
    const query = new URLSearchParams(search).get('q');

    const [loading, setloading] = useState(true);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const fetchSearch = async () =>{
        
        try{
            setloading(true);

            const response = await instance.get(`/search/movie` , {
                params: {
                    api_key: import.meta.env.VITE_TMDB_API_KEY,
                    query: query,
                    page: page,
                },
            })
            const data = response.data.results;
            setData(prev => [...prev, ...data || []]);
            
        }
        catch(err){
            console.log(err);
        }
        finally{
            setloading(false);
        }

    }

    useEffect(() => {
    if(query){
        setData([]);
        setPage(1);
    } 
  }, [query]);

    useEffect(() => {
        if(query) fetchSearch();     // load fresh
    }, [query, page]);




  return (
    <>
    <div className='text-white text-lg'>
        Search for <span className='text-cyan-600'>{query} :</span>
    </div>
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {
            loading ? <div>no....</div> : 
            data.map( (data, idx) =>(
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

export default Search