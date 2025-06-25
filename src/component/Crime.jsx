import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Crime = () => {

    const [Crime, setCrime] = React.useState([]);
    const getCrime = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=80");
            setCrime(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
      if( Crime.length == 0){
        getCrime();
      }
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Crime Movies</h2>
          <div>
            <Card data={Crime} />
          </div>

    </main>
    </>
  )
}

export default Crime