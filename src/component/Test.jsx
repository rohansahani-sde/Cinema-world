import React, { useEffect, useState } from 'react'
// import {  newapi } from '../store'
import { Link } from 'react-router-dom';
// import { preview } from 'vite';

const Test = () => {

    const categories = ["popular", "top_rated", "upcoming"];



  const [fav, setFav] = useState([]);
  const addFav = (item) => {
    setFav((prev) => [...prev, item]);
  }
  // console.log(fav);
  useEffect(() => {
    console.log('Updated fav list:', fav);
  }, [fav]);
  


  const [data, setData] = useState({});
  
  
  // Fetch data from API
  useEffect(() => {

      const fetchdata = async () => {
        if (Object.keys(data).length > 0) return;
        
          const response = await Promise.all(
            categories.map(async (category) => {
              try{
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${category}`
                );
                console.log(res.data.results)
                return { [category]: res.data.results };
              }
              catch(error){
                console.error(`Error fetching ${category}:`, error.message);
                return { [category]: [] };
              }
            })
          ) 
          const combined = response.reduce((acc, curr) => ({ ...acc, ...curr }), {});
          setData(combined);
          
        };
        
        fetchdata();
  
      }, [data]);
  return (
    <>
    <div className='bg-gray-900'>

      {categories.map((category) => (
        <div key={category} className='sm:mx-6 mx-2'>
          <div className=' dark:bg-gray-900 text-gray-100 pt-6 pb-2 my-2 font-semibold sm:text-2xl text-lg'>
          <div className='h-1 bg-amber-400 bg-gradient-to-r from-red-600 via-red-500 to-red-200 rounded-r-full'></div>
          <h2>{category.toUpperCase()}  ᅳ►</h2>
          </div>

          <div className='flex overflow-x-auto scrollbar-none scroll-smooth '>

          {data[category]?.map((data,index) => (

        <Link to={`/news/${category}/${data.title}`}
        state={{data}}
          >
            <div key={index} className="relative flex items-end overflow-hidden rounded-lg bg-gray-900 shadow-lg group md:h-64 h-52 md:min-w-[270px] min-w-[200px] mx-1">
            <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                    backgroundImage:
                        `url(${data.multimedia?.[0].url})`,
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
            <div className="relative flex flex-col items-center text-white p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <h2 className="text-lg font-bold">{data?.geo_facet?.[0]}</h2>
                <p className="mt-2 italic text-sm">
                    {data?.title}
                </p>

                {/* <a href={data.url} target="__blank" rel="noopener noreferrer" > */}
                <button className="mt-4 px-4 py-2 bg-darklw text-white font-bold text-xs uppercase tracking-wide rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-yellow-400">
                    View News
                </button>
                {/* demo */}
                {/* </a> */}
            </div>
        </div>
            
        
        </Link>
          ))}
         
          </div>

        </div>
      ))}
    </div>
    </>
  )
}

export default Test