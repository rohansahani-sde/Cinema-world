import React, { useEffect, useState } from 'react'
import { getTvShows, getVideo } from '../store'
import { BsArrowLeft, BsArrowRight, BsSearch } from 'react-icons/bs'




const Tvshow = () => {


    const [tvShow, setTvShow] = useState([])
    const [search, setSearch] = useState('shows')
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()
    
    async function fetchTvShow(){
        if(search.trim()=== '') return
        const response = await getTvShows(search, page)
        setTvShow(response.results)
        setTotalPage(response.total_pages)
        console.log(response.results)
    }
    useEffect(()=>{
      const delay = setTimeout(() => {
        fetchTvShow()
      }, 500);
      return ()=> clearTimeout(delay)
    },[search,page])

    useEffect(() => {
        
    })
    

    useEffect(() =>{
        setPage(1)
    },[search])

    async function fetchVideo(seriesId) {
        const data = await getVideo(seriesId);
        if (data.results.length > 0) {
          const url = `https://www.youtube.com/embed/${data.results[0].key}`;
          window.open(url, '_blank'); 
        } else {
          alert('Sorry No trailer available');
        }
      }
    

  return (
    <>
    <div className='bg-black min-h-screen p-6 text-white pt-16'>
    <h1 className="text-center text-3xl font-bold mb-4">
        📺<span className='animate-pulse'>Explore Tv Shows</span> 
     </h1>
    <div className="flex justify-center mb-6">
        <div className='relative sm:w-full max-w-md'>
        <input
          type="text"
          placeholder="Search Tv Shows..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:p-3 p-2 sm:pl-5 pl-5 text-lg border border-gray-600 bg-gray-800 text-white rounded-full focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 outline-none"
        />
        <BsSearch className='absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-400' />
        </div>
      </div>
      {/* data & Tv Shows List */}
      <div className="flex flex-wrap sm:gap-5 gap-3 justify-center mt-5">
        {tvShow.length > 0 ? (
          tvShow.map((tvShow) => (
            <div key={tvShow.id} className="sm:w-64 w-44 border rounded-xl text-center  bg-gray-800">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                className="w-full rounded-t-xl"
                alt={tvShow.name}
              />
              <h3 className="mt-2 font-semibold">{tvShow.name}</h3>
              <button
                className=" border-b-2 border-t border-cyan-400 hover:scale-105 duration-300 mb-2 hover:bg-cyan-400 hover:text-black font-semibold rounded-xl p-1 mt-2"
                onClick={() => fetchVideo(tvShow.id)}
              >
                📺 Preview Show
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg "> sorry No Show found</p>
        )}
      </div>

      <div className='border-b py-4 rounded-3xl items-center my-4 '>
       .
      </div>




      {/* buttons  */}
      <div className="text-xl flex justify-center items-center gap-3 py-5">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                className="flex items-center border-b-2 border-t-2 hover:bg-cyan-400 hover:text-black duration-300 hover:scale-105 rounded-xl px-3"
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
                className="flex items-center border-b-2 border-t-2 hover:bg-cyan-400 hover:text-black duration-300 hover:scale-105 rounded-xl px-3"
              >
                  Next <BsArrowRight className='text-2xl ml-2'/>
              </button>
            </div>
    </div>
    </>
  )
}

export default Tvshow