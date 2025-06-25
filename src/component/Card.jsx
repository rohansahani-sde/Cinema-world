import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({data}) => {

    if (!data || !Array.isArray(data)) return null;

  return (
    <div>
        <div className='flex  overflow-x-auto scrollbar-none scroll-smooth ' >
      {data?.map((data, index) => (
        <Link to={`/details/${data.id}`} 
        state={{data}}
        key={index}>

            <div key={index} className="relative flex items-end overflow-hidden rounded-lg bg-gray-900 shadow-lg group md:h-80 h-52 md:min-w-[250px] min-w-[200px] mx-1">
            <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                    backgroundImage:
                        `url(https://image.tmdb.org/t/p/w500${data.poster_path})`
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
            <div className="relative flex flex-col items-center text-white p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <h2 className="text-lg font-bold">{data.title}</h2>
                {/* <p className="mt-2 italic text-sm">
                    
                </p> */}
                <button className="mt-4 px-4 py-2 bg-darklw text-white font-bold text-xs uppercase tracking-wide rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-yellow-400">
                    Play <FaPlay /> 
                </button>
                
            </div>
        </div>        
        </Link>

    ))}
    </div>
    </div>
  );
};

export default Card;


// 