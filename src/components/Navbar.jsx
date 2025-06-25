import React, { useState } from 'react'
import { FaGithub, FaHeart, FaHome, FaLocationArrow, FaPlayCircle, FaSearch } from 'react-icons/fa';
import { FaCartShopping, FaLocationDot } from 'react-icons/fa6';
import { FiTv } from 'react-icons/fi';
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { IoMenu } from 'react-icons/io5';
import { MdMovie } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {

    const [query, setQuery] =useState('');
    const navigate = useNavigate()

    const handleSearch = (e) =>{
        e.preventDefault()
        if(query.trim()){
            navigate(`/search?q=${encodeURIComponent(query.trim()) }`);
        }
        console.log("Seach buittom");
    }
    
    const links = [
        { name: "Home", link: "/" },
        { name: "Top Rated", link: "/movie/top_rated" },
        { name: "Upcoming", link: "/movie/upcoming" },
        { name: "Now Playing", link: "/movie/now_playing" },
        { name: "Popular", link: "/movie/popular" },
    ];


    
    const [isOpen , setIsOpen] = useState(false)
    
  return (
    <>
    
<div className="bg-white">
  <div className="border py-3 px-6">
    <div className="flex justify-between">
      <div className="flex items-center">
        
        <span className="ml-2 font-bold text-3xl text-[#252C32]">Cinema-world</span>
      </div>

      <div className="ml-6 flex flex-1 gap-x-3">
        <div className="flex cursor-pointer select-none items-center gap-x-2 rounded-md border bg-[#4094F7] py-2 px-4 text-white hover:bg-blue-500">
            <IoMenu /> 
          <span className="text-sm font-medium">Categories</span>
        </div>

        <form onSubmit={handleSearch} className='w-3/4 flex' >
            <input type="text" 
            placeholder="Search Movies or shows ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-white rounded-md border border-[#DDE2E4] px-3 py-2 text-base" />

            <button
            type="submit"
            className="flex items-center gap-x-2 bg-blue-500 text-white px-2 py-1 rounded-md"   >
                <FaSearch /> Search
            </button>
        </form>


      </div>

      <div className="ml-2 flex">
        {/* Favorites */}
        <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
          <FaHeart/>
          <span className="text-sm font-medium">Favorites</span>
        </div>

        <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
          <span className="text-sm font-medium">Sign in</span>
        </div>
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between">
        {/* location */}
      <div className="flex gap-x-2 py-1 px-2">
        
        <FaLocationDot />
        <span className="text-sm font-medium">Bangalore</span>
      </div>

      {/* menu */}
      <div className="flex gap-x-8">
        {
            links.map((link, idx)=>(
                <span key={idx} className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
                    <Link to={`${link.link}`}> {link.name} </Link>
                </span>

            ))
        }
      </div>

      <a href="https://github.com/rohansahani-sde" target="_blank" >
      <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100 hover:scale-110 hover:text-black flex items-center transition-all duration-300"> <FaGithub/> GitHub</span>
      </a>
    </div>

  </div>
</div>
    </>
  )
}

export default Navbar


