import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Science = () => {

    const [Science, setScience] = React.useState([]);
    const getScience = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=878");
            setScience(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if( Science.length == 0) {
            getScience();
        }
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Science </h2>
          <div>
            <Card data={Science} />
          </div>

    </main>
    </>
  )
}

export default Science