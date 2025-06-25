import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Comedy = () => {

    const [Comedy, setComedy] = React.useState([]);
    const getComedy = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=35");
            setComedy(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
      if( Comedy.length == 0) {
        getComedy();
      }
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Comedy Movies</h2>
          <div>
            <Card data={Comedy} />
          </div>

    </main>
    </>
  )
}

export default Comedy