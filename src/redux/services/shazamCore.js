import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fbe014047fmsh5fecb8c1f3e9c0bp163808jsn86872ae7e609',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  
  fetch('https://shazam.p.rapidapi.com/charts/track', options)
    .then(response => response.json())
    .then(response =>localStorage.setItem('discover',JSON.stringify(response.tracks)))
    .catch(err => console.error(err));

export  const shazamCoreApi = createApi({ 
    reducerPath:"shazamCoreApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "https://shazam.p.rapidapi.com",
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key' , 'fbe014047fmsh5fecb8c1f3e9c0bp163808jsn86872ae7e609')

            return headers
        },
    }),
    endpoints : (builder) => ({
        getTopCharts :  builder.query({query: () => '/artists/get-summary'})
    })
})

export const {
    useGetTopChartsQuery,
} = shazamCoreApi







