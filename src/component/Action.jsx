import React, { useEffect } from 'react'
import Card from './Card';
import instance from '../utils/axios';

const Action = () => {

    const [Action, setAction] = React.useState([]);
    const getAction = async () => {
        try {
            const response = await instance.get("/discover/movie?with_genres=28");
            setAction(response.data.results);
            console.log(response.data);
            } 
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
      if( Action.length == 0 ){
        getAction();
      }
    },[])
    
    
  return (
    <>
    <main>
        <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>Action</h2>
          <div>
            <Card data={Action} />
          </div>

    </main>
    </>
  )
}

export default Action