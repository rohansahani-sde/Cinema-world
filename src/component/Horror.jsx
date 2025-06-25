import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Horror = () => {

    const [Horror, setHorror] = React.useState([]);
    const getHorror = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=27");
            setHorror(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
      if( Horror.length == 0){
        getHorror();
      }
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Horror Movies</h2>
          <div>
            <Card data={Horror} />
          </div>

    </main>
    </>
  )
}

export default Horror