import React, { useEffect, useState } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa';
import { FaWikipediaW } from 'react-icons/fa6';
import { LiaImdb } from 'react-icons/lia';
import { TbWorld } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../utils/axios';

const Details = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {data} = location.state || {};
    console.log(data)
    const movieId = data?.id

    const [key, setKey] = useState("")
    const [external, setExternal] = useState([]);




    const getTrailer = async () => {
        try{
            // const response = await instance.get(`/movie/${movieId}/videos`);
            const response = await instance.get(`/movie/${movieId}/videos`);
            setKey(response.data.results[0]?.key || response.data.results[1]?.key)
            const tmdb = await instance.get(`/movie/${movieId}/external_ids`);
            setExternal(tmdb.data)
            console.log("Details :")
            console.log(response.data);
            console.log(tmdb.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() =>{
        getTrailer();
    },[])

    const [showModal, setShowModal] = useState(false);
    
  return (
    <>
    <main className=' relative bg-opacity-70  bg-gray-800' >
        {/* Background Image */}
        <div className="w-screen h-screen overflow-hidden">
            <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`}
            // src="https://image.tmdb.org/t/p/w500/4A5HH9HkCPqAwyYL6CnA0mxbYjn.jpg"
            alt="Background"
            />
        </div>


        <div className=" absolute top-0 h-screen w-screen bg-white/5 bg-gradient-to-r from-black">

        {/* back Icon */}
        <div className=' absolute top-5  rounded-full left-5 text-3xl'>
        {/* back icon  */}
        <button 
        className='hover:text-black hover:bg-gray-300 rounded-full transition-all duration-300'
        onClick={() => navigate('/')}>
        <FaArrowCircleLeft />
        </button>

        </div>

        {/* Image */}
        <div className=' absolute top-[20%] left-[10%] h-[60%]   '>
            <img 
            className="w-full h-full object-cover rounded-xl"
            src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
            // src="https://image.tmdb.org/t/p/w500/qycPITRqXgPai7zj1gKffjCdSB5.jpg" 
            alt="" />
        </div>


        <div className='absolute text-white top-[20%] right-[10%] h-[60%] w-[55%] rounded-xl bg-opacity-50  flex flex-col gap-y-6'>
            {/* Name */}
            <div className='text-3xl font-semibold flex items-baseline gap-x-2'>
                <h1> {data?.title} </h1>
                <h1 className='text-xl opacity-70'>({data?.media_type})</h1>
            </div>

            <div className='flex gap-x-6 text-lg'>
            {/* Rating */}
            <div className=''>
                <h1 className='text-amber-400'>{data?.vote_average}</h1>
                <h1 className='opacity-70'>Rating</h1>
            </div>
            {/* Date */}
            <div>
                <h1 className=' opacity-70'>Releaser Date</h1>
                <h1>{new Date(data?.release_date).toLocaleDateString()} </h1>
            </div>

            </div>
            {/* desciption */}
            <div>
                <h1>{data?.overview} </h1>
            </div>
            {/* genera */}
            <div className=' flex gap-x-6 '>
                {/* <h1 className=' bg-slate-300 bg-opacity-20 p-2 rounded-3xl'>{data?.genre_ids[0]} </h1> */}
                <h1 className=' bg-slate-300 bg-opacity-20 p-2 rounded-3xl'>Genears</h1>
                <h1 className=' bg-slate-300 bg-opacity-20 p-2 rounded-3xl'>Genears</h1>
            </div>
            {/* Play buttom */}
            <div>
                <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition"
                >
                    ▶ Watch Trailer
                </button>
            </div>
            {/* links */}
            <div className='flex text-3xl gap-x-10'>
                {/* imdb */}
                <a target='_blank' rel='noopener noreferrer' 
                href={`https://www.imdb.com/title/${external?.imdb_id}/`} >
                <h1><LiaImdb /></h1>
                </a>
                <a target='_blank' rel='noopener noreferrer'
                href={`https://www.wikidata.org/wiki/${external?.wikidata_id}`}>
                <h1><FaWikipediaW /></h1>
                </a>
                <a target='_blank'  rel='noopener noreferrer'
                href={`https://www.google.com/search?q=${data?.title}`}>
                <h1><TbWorld /></h1>
                </a>
            </div>

            
        </div>

        {/* trailer Video */}
        
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <div className=" relative w-screen h-screen flex items-center justify-center "
          onClick={() => setShowModal(false)}
          >
            {/* Close Button */}
            <button
              className="absolute text-white hover:text-red-600 text-4xl top-24 right-64"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            {/* video */}
            <div className='h-[60%] w-[60%]'>
            <iframe
            className="rounded-xl w-full h-full object-cover "
            src={`https://www.youtube.com/embed/${key}?autoplay=1`}
            title="YouTube trailer"
            frameBorder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>
            </div>

          </div>
        </div>

      )}
        </div>


    </main>
    </>
  )
}

export default Details