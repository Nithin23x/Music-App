import { useDispatch,useSelector } from 'react-redux';
import {Error,Loader,SongCard} from '../components'
import {genres} from '../assets/constants'
import { generatePath, json } from 'react-router-dom';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { reactHooksModule } from '@reduxjs/toolkit/dist/query/react';
import { useState } from 'react';






const  Discover = () => {
    const dispatch = useDispatch()
    const{activeSong ,isPlaying } = useSelector((state) => state.player)
    const {data , isFetching , error } = useGetTopChartsQuery()

  const item = (localStorage.getItem('discover'))
  const finalList= JSON.parse(item)  
  const genreTitle = "Rock"

  if(isFetching) return <Loader />

  if(error) return <Error />

    

    return(
        
        <div className='flex flex-col'>
           <div className=' w-full flex justify-between items-center
           sm:flex-row flex-col mt-4 mb-10 '>
                <h2 className='font-bold font-mono text-white text-2xl'>Discover <span className='font-bold'>{genreTitle}</span> </h2>
                <select
                    onChange={() => {}} 
                    value=""
                    className='bg-black text-gray-300 rounded-lg p-3 text-sm outline-none sm:mt-0 mt-5 '
                >
                    {
                        genres.map(
                            genre => 
                                <option key={genre.value} value={genre.value}>
                                    {genre.title}
                                </option>
                            
                        )
                    }
                </select>
            </div>
            
           <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
            {
                finalList.map(
                    eachItem => (
                        <SongCard key={eachItem.key} eachItem={eachItem} isPlaying={isPlaying} activeSong={activeSong} />
                    )
                )
            }
           </div>

            

        </div>
    )
}

export default Discover;
