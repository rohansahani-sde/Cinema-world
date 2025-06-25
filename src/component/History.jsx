import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const History = () => {

    const [History, setHistory] = React.useState([]);
    const getHistory = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=80");
            setHistory(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getHistory();
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>History Movies</h2>
          <div>
            <Card data={History} />
          </div>

    </main>
    </>
  )
}

export default History