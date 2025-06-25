import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Mystery = () => {

    const [Mystery, setMystery] = React.useState([]);
    const getMystery = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=9648");
            setMystery(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if( Mystery.length == 0 ){
            getMystery();
        }
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Mystery </h2>
          <div>
            <Card data={Mystery} />
          </div>

    </main>
    </>
  )
}

export default Mystery