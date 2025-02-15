import React, { useEffect, useState } from 'react';
import { getSeries, getVideo } from '../store';
import { BsArrowLeft, BsArrowRight, BsArrowRightShort  } from "react-icons/bs";

const Series = () => {
  const [search, setSearch] = useState('Game');
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)

  
//   fetch serires & data
    async function fetchSeries() {
        if(search.trim() === '') return;
        const data = await getSeries(search, page);
        setTotalPage(data.total_pages)
        setSeries(data.results || []);
    }

    useEffect(() => {
      const delay = setTimeout(() => {
        fetchSeries();
      }, 500);
      return () => clearTimeout(delay);
    },[page,search])

    useEffect(() => {
      setPage(1)
    },[search])

// fetch Trailer videos by series id
  async function fetchVideo(seriesId) {
    const data = await getVideo(seriesId);
    if (data.results.length > 0) {
      const url = `https://www.youtube.com/embed/${data.results[0].key}`;
      window.open(url, '_blank'); 
    } else {
      alert('No trailer available');
    }
  }

  return (
    <div className=''>
    <div className="bg-black text-white min-h-screen relative pt-16">
      <h1 className="text-center text-3xl font-bold mb-4">
        📺<span className='animate-pulse'>Explore Series</span> 
     </h1>

      {/* input */}
 
    <div className="flex justify-center">
  <div className="relative sm:w-full max-w-md">
    <input
      type="text"
      placeholder="Search Series..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 pl-10 text-lg border border-gray-600 bg-gray-900 text-white rounded-full focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 outline-none"
    />
    <BsArrowRightShort className="absolute right-4 top-1/2 transform text-2xl  -translate-y-1/2 text-gray-400 animate-pulse " />
    
  </div>
  </div>

      <div className="flex flex-wrap sm:gap-5 gap-3 justify-center mt-5">
        {series.length > 0 ? (
          series.map((item) => (
            <div key={item.id} className="sm:w-64 w-44 border rounded-xl text-center bg-gray-800">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                className="w-full rounded-t-xl"
                alt={item.name}
              />
              <h3 className="mt-2 font-semibold">{item.name}</h3>
              <button
                className=" border-b-2 border-t border-cyan-400 hover:scale-105 duration-300 mb-2 hover:bg-cyan-400 hover:text-black font-semibold rounded-xl p-1 mt-2"
                onClick={() => fetchVideo(item.id)}
              >
                📺 Watch Trailer
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg ">Loading....</p>
        )}
      </div>
      <div className='border-b rounded-3xl mt-8'>
        .
      </div>
      {/* Next and Prev buttons */}
      <div className="text-xl flex justify-center items-center gap-3 py-5">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          className="flex items-center border-b-2 border-t-2 hover:bg-cyan-400 hover:text-black duration-300 hover:scale-105 rounded-xl p-2"
        >
            <BsArrowLeft className='text-2xl mr-2'/> Prev
        </button>
        <span> 📄 {page} </span>
        <button
          onClick={() => {
            if(totalPage > 0){
              setPage(page + 1 )}
            }
          }
          disabled={totalPage === page}
          className="flex items-center border-b-2 border-t-2 hover:bg-cyan-400 hover:text-black duration-300 hover:scale-105 rounded-xl p-2"
        >
            Next <BsArrowRight className='text-2xl ml-2'/>
        </button>
      </div>
    </div>
    </div>
  );
};

export default Series;
