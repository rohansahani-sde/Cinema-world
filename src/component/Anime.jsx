import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Anime = () => {

    const [Anime, setAnime] = React.useState([]);
    const getAnime = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=16&with_original_language=ja");
            setAnime(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
      if( Anime.length === 0) {
        getAnime();
      }
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Anime </h2>
          <div>
            <Card data={Anime} />
          </div>

    </main>
    </>
  )
}

export default Anime