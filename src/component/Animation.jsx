import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Animation = () => {

    const [Animation, setAnimation] = React.useState([]);
    const getAnimation = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=16");
            setAnimation(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
      if( Animation.length == 0) {
        getAnimation();
      }
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Animation </h2>
          <div>
            <Card data={Animation} />
          </div>

    </main>
    </>
  )
}


export default Animation