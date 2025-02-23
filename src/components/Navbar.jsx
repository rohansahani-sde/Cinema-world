import React, { useState } from 'react'
import { FaHome, FaPlayCircle } from 'react-icons/fa';
import { FiTv } from 'react-icons/fi';
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { MdMovie } from 'react-icons/md';


const Navbar = () => {
    const links = [
        { name: "Home",icon: <FaHome/> , link: "/" },
        { name: "Movies", icon: <MdMovie /> , link: "/movies" },
        { name: "Series", icon: <FaPlayCircle />  , link: "/series" },
        { name: "Tv Show", icon: <FiTv /> , link: "/tvshow" },
    ];

    const [isOpen , setIsOpen] = useState(false)
    
  return (
    <>
    <div className={`flex flex-col bg-black text-white p-4  w-full top-0 left-0 z-50 shadow-md justify- fixed `}>
        <div className=' container mx-auto flex justify-between px-4 animate-fadeInX'>
            <h1 className='text-2xl font-bold hover:text-cyan-500 cursor-pointer'>Cinema World</h1>
        <div className='hidden md:flex space-x-6 animate-fadeInY'>
            <ul className='flex space-x-6 duration-700'>
                {links.map(({name,link,icon}) => (
                    <li key={name} className='hover:text-cyan-600 active:text-cyan-700 hover:border-b px-2 hover:border-cyan-600 rounded-lg transition-all duration-200 group hover:scale-110 ' >
                        <a className='flex items-center' href={link}> {icon} {name}</a>
                    </li>
                ))}
            </ul>
        </div>
        {/* hidden for mobile */}
        <div className='md:hidden text-3xl flex items-center justify-end cursor-pointer'>
            <button 
            onClick={()=>{setIsOpen(!isOpen)}}
            >{isOpen ?  <IoMdClose/>: <IoIosMenu/>}</button>
        </div>
        </div>
        <div className={ ` absolute md:opacity-0 top-11 left-0 
            w-full flex flex-col items-center font-semibold text-lg
            bg-black 
            transform transition-transform 
            ${isOpen ? ' block animate-fadeInX' : 'hidden '} `}>
            <ul className='flex flex-col items-center space-y-2 py-6 '>
                {links.map(({name,link}) => (
                    <li key={name} className='text-center hover:text-cyan-600 hover:border-b px-2  hover:border-cyan-600 rounded-lg duration-200
                     transition-all ease-in-out ' >
                        <a href={link}>{name}</a>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    </>
  )
}

export default Navbar