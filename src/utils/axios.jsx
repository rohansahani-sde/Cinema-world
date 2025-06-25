import axios from "axios";


const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ViZTc2NjRmMzA1OThmYjU3MTNiNzZlYzRkYTI0MyIsIm5iZiI6MS43MzczMDk4Nzg2NzI5OTk5ZSs5LCJzdWIiOiI2NzhkM2ViNjQyZjI3Yzc1NGM2NTFmNDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.v1Saj4mhsJSZeYkSdG4VoKuMu90BgKYhuqcMyLRBLCA'
  }

});

export default instance;

