import React from 'react';
import { FaPlay } from 'react-icons/fa';
// import { data, Link } from 'react-router-dom';
import logo from "/load.gif"

const Card = ({ title, description, urlToImage, rating, date }) => {
  return (
    <>
    {/* <Link to={`/news/${data.title}`} 
    state={{data}}
    > */}
    
    
    
<div className="group relative grid h-[25rem] w-full max-w-[15rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
  {/* Background image */}
  <div
    className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none"
    style={{ backgroundImage: `url(${urlToImage || '/load.gif'})` }}
  >
    <div className=" hidden group-hover:block absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
  </div>

  {/* Title & Description */}
  <div className="relative py-8 px-6 md:px-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
    <h2 className="text-2xl font-medium text-white">{title}</h2>
    <h5 className="mb-4 text-sm font-semibold text-gray-300">{description ? description.slice(0, 100) + '...' : ''}</h5>
    <h5 className='text-white absolute left-2'>{date}</h5>
    <h5 className='text-white absolute right-2'>✨{rating}</h5>
  </div>
</div>


    {/* </Link> */}
    
    </>
  );
};

export default Card;
