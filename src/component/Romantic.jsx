import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Romantic = () => {

    const [Romantic, setRomantic] = React.useState([]);
    const getRomantic = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=10749"); //10749
            setRomantic(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
      if( Romantic.length == 0 ){
        getRomantic();
      }
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Romantic Movies</h2>
          <div>
            <Card data={Romantic} />
          </div>

    </main>
    </>
  )
}

export default Romantic