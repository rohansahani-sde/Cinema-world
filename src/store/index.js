import {API_KEY} from '../utils/constant'

export async function getData(lang, pgno ) {
   const data = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=${lang}/&page=${pgno}/&api_key=${API_KEY}`)
//    const data = await fetch(`https://api.themoviedb.org/3/search/tv?query=${search}/&page=${pgno}/&api_key=${API_KEY}`)
   const response = await data.json()
   console.log(response)
   return response
}

// home
export async function getHomeData(lang, pgno) {
   const data = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${pageNum}`)
   const response = await data.json()
   return response
}

// Tv Shows
export async function getTvShows(search, pgno ) {
   const data = await fetch(`https://api.themoviedb.org/3/search/tv?query=${search}/&page=${pgno}/&api_key=${API_KEY}`)
   const response = await data.json()
   return response
}

// Movie.jsx
export async function getMovies(lang,pgno,sort){
   // const data = await fetch(`https://api.themoviedb.org/3/search/tv?query=${search}/&page=${pgno}/&api_key=${API_KEY}`)
   const data = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${lang}&page=${pgno}&sort_by=${sort}.desc/&api_key=${API_KEY}`)
   const response = await data.json()
   return response
   // popular or trending 
}

// series.jsx
export async function getSeries(search, pgno ) {
    const data = await fetch(`https://api.themoviedb.org/3/search/tv?query=${search}&page=${pgno}&api_key=${API_KEY}`)
    // https://api.themoviedb.org/3/search/tv?query=${search}&page=${pgno}&api_key=${API_KEY}
    const response = await data.json()
    return response
}

// series.jsx
export async function getVideo(seriesId){
    const data = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/videos?api_key=${API_KEY}&language=en-US`)
    const response = await data.json()
    return response
}

