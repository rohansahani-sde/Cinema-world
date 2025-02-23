import React from 'react'
import { FaHome } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { GoRepo } from 'react-icons/go';
import { IoPersonSharp } from 'react-icons/io5';
import { MdContactMail } from 'react-icons/md';
import { SiLeetcode } from 'react-icons/si';

const Footer = () => {
    const links = [
        { name: "Home", icon: <FaHome />, link: "/" },
        { name: "Projects", icon: <GoRepo />, link: "https://github.com/0001sahani" },
        { name: "Contact", icon: <MdContactMail />, link: "mailto:sahanirohan313@gmail.com" },
        { name: "About", icon: <IoPersonSharp />, link: "https://www.linkedin.com/in/rohan-sahani-09-/" },
    ];
  return (
    <>
    <div className='md:flex md:justify-between gap-x-10 bg-gray-900 pt-12 space-y-3 md:space-y-0'>
    <div className='md:w-1/3 '>
        <h1 className='text-2xl md:ml-6 ml-3 group hover:text-amber-500 transition-all duration-300 cursor-pointer'>
            Rohan <span className='text-amber-500 animate-pulse group-hover:text-white transition-all duration-300'>Sahani</span>
        </h1>
    </div>
    <div className='flex justify-center text-lg text-white md:justify-center gap-x-5 mg:gap-x-10 md:w-1/3'>
        {links.map((link) => (
            <a key={link.name} href={link.link} className='flex items-center hover:text-amber-500 hover:scale-125 transition-all duration-300 group' >
               {link.icon} {link.name}
            </a>
        ))}
    </div>
    <div className='flex justify-center md:w-1/3 gap-x-5'>
    <div  className='text-2xl text-white hover:scale-125 transition-all duration-300 hover:text-sky-700 p-2'>
    <a target='_blank' href="https://www.linkedin.com/in/rohan-sahani-09-/">
        <FaLinkedin /> 
    </a>
    </div>
    <div  className='text-2xl text-white hover:scale-125 transition-all duration-300 p-2'>
    <a target='_blank' href="https://github.com/0001sahani">
        <FaGithub  />
    </a>
    </div>
    <div  className='text-2xl text-white hover:scale-125 transition-all duration-300 hover:text-amber-500 p-2 '>
    <a target='_blank' href="https://leetcode.com/u/sahanirohan313/">
        <SiLeetcode />
    </a>
    </div>
    <div  className='text-2xl text-white hover:scale-125 transition-all duration-300 hover:text-blue-600 p-2'>
    <a target='_blank' href="https://x.com/9793_rohan">
        <FaTwitter /> 
    </a>
    </div>
    </div>
    </div>
    <div className='text-center text-white p-2 border-t border-gray-500 bg-gray-900 '>
        <h1>
            Made with <span className='text-amber-500 animate-pulse'>💖</span> by Rohan <span className='text-amber-500'>Sahani</span>
        </h1>
    </div>
    </>
  )
}

export default Footer