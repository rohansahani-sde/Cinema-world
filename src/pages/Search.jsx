import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiSearch, HiArrowRight } from 'react-icons/hi'
import instance from '../utils/axios'
import Card from '../components/Card'
import Loading from '../components/Loading'

const Search = () => {
  const { search } = useLocation()
  const query = new URLSearchParams(search).get('q')

  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  const fetchSearch = async () => {
    try {
      setLoading(true)
      const response = await instance.get(`/search/movie`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          query: query,
          page: page,
        },
      })
      const results = response.data.results
      setData((prev) => (page === 1 ? results || [] : [...prev, ...results || []]))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query) {
      setData([])
      setPage(1)
    }
  }, [query])

  useEffect(() => {
    if (query) fetchSearch()
  }, [query, page])

  if (!query) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center px-6">
        <div className="text-center">
          <HiSearch className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Search for Movies</h2>
          <p className="text-white/50">Use the search bar above to find movies</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Search Results for <span className="gradient-text">"{query}"</span>
          </h1>
          <p className="mt-2 text-white/50 text-base">
            {data.length > 0 ? `${data.length} titles found` : 'Searching...'}
          </p>
        </div>

        {/* Results Grid */}
        {loading && data.length === 0 ? (
          <Loading />
        ) : data.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/10 border border-dashed border-white/10 rounded-3xl">
            <HiSearch className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h2 className="text-xl font-bold font-heading mb-2">No results found</h2>
            <p className="text-white/50 text-sm max-w-sm mx-auto">
              We couldn't find any titles matching "{query}". Try checking the spelling or search for something else.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {data.map((item, idx) => (
                <Card
                  key={`${item.id}-${idx}`}
                  title={item?.title || item?.name}
                  description={item?.overview}
                  urlToImage={item?.poster_path ? `https://image.tmdb.org/t/p/w300${item?.poster_path}` : null}
                  rating={item?.vote_average}
                  date={item?.release_date || item?.first_air_date ? new Date(item.release_date || item.first_air_date).getFullYear().toString() : ''}
                  data={item}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 disabled:opacity-50 transition-all font-semibold text-sm"
              >
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    Load More <HiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Search
