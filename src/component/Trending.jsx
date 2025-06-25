import React, { useEffect, useState } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Trending = () => {

    const [trending, setTrending] = React.useState([]);
    const [loaded, setLoaded] = useState(false);

    // const ONE_HOUR = 60 * 60 * 1000;
    const getTrending = async () => {
      const cached = localStorage.getItem("trendingData");

      if (cached) {
        setTrending(JSON.parse(cached));
        return;
      }
      // if (trending.length > 0) return;
      if (loaded) return;
        try {
            const response = await instance.get("/trending/movie/day");
            setTrending(response.data.results);
            setLoaded(true);
            localStorage.setItem("trendingData", JSON.stringify(response.data.results));
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
      getTrending();
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Trending Movies & TV Shows</h2>
          <div>
            <Card data={trending} />
          </div>

    </main>
    </>
  )
}

export default Trending