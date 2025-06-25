import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Latest = () => {

    const [Latest, setLatest] = React.useState([]);
    const getLatest = async () => {
        try {
            const response = await instance.get("/movie/upcoming");
            setLatest(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
      if( Latest.length ==0 ){
        getLatest();
      }
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Latest </h2>
          <div>
            <Card data={Latest} />
          </div>

    </main>
    </>
  )
}


export default Latest