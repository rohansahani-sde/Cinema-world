import React, { useEffect } from 'react'
import instance from '../utils/axios';
import Card from './Card';

const Adventure = () => {

    const [trending, setAdventure] = React.useState([]);
    const getAdventure = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=12");
            setAdventure(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
      if( trending.length == 0 ) {
        getAdventure();
      }
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Adventure Movies </h2>
          <div>
            <Card data={trending} />
          </div>

    </main>
    </>
  )
}

export default Adventure