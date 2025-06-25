import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Documentary = () => {

    const [Documentary, setDocumentary] = React.useState([]);
    const getDocumentary = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=99");
            setDocumentary(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getDocumentary();
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Documentary Movies</h2>
          <div>
            <Card data={Documentary} />
          </div>

    </main>
    </>
  )
}

export default Documentary