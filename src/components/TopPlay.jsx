import { useEffect,useRef } from "react";
import { Link, json } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {Swiper,SwiperSlide } from 'swiper/react'
import { FreeMode } from "swiper";
import PlayPause from './PlayPause'
import {playPause,setActiveSong } from '../redux/features/playerSlice'
import {useGetTopChartsQuery } from '../redux/services/shazamCore'



import 'swiper/css'
import 'swiper/css/free-mode'




const TopChartCard = (props) => {

  const {eachItem,isPlaying,activeSong,handlePauseClick,handlePlayClick} = props 
  return(
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2 "> 
      <div className="flex-1 flex flex-row justify-between items-center "> 
        <img  src={eachItem?.images?.coverart} alt="Song Title" className="w-20 h-20 rounded-lg"/>  
        <div className="flex-1 flex flex-col justify-start mx-3 "> 
          <Link to={`/songs/${eachItem.key}`}>
            <p className="text-l font-bold  text-white ">{eachItem?.title}</p>
          </Link>

          <Link to={`/artists/${eachItem?.artists[0].adamid}`}>
            <p className="text-ase mt-1   text-gray-300 ">{eachItem?.subtitle}</p>
          </Link>
        </div>
      </div>
    <PlayPause 
      isPlaying={isPlaying}
      activeSong={activeSong}
      eachItem ={eachItem}
      handlePause = {handlePauseClick}
      handlePlay = {handlePlayClick} 
    />
  </div>
  )
}



const  TopPlay = () => {
  const dispatch = useDispatch()
  const {activeSong , isPlaying} = useSelector( (state) => state.player )

  // localStorage.setItem("topcharts" , JSON.stringify(topCharts)) 
  const divRef = useRef(null)

   const  stringList  = (localStorage.getItem('discover') ) 
  const topPlays = JSON.parse(stringList) 
  

  useEffect(() =>{
      divRef.current.scrollIntoView({behavior:'smooth' })
    }
  )



  const handlePauseClick = () =>{
    dispatch(playPause(false))
    console.log("handle pause ")
  }

  const handlePlayClick = (eachItem) => {
    console.log("handle play")
    dispatch(setActiveSong({eachItem}))  
    dispatch(playPause(true)) 
  }

  return(
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl"> Top Charts </h2>
          <Link to='/top-charts'> <p className="text-gray-300 text-base cursor-pointer">See More </p></Link>

        </div>

        <div className="mt-4 flex flex-col gap-1 ">
          {
            topPlays.map(
              eachItem => (
                <TopChartCard eachItem={eachItem} key={eachItem.key} isPlaying={isPlaying}  activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={() => handlePlayClick(eachItem)}/> 
              )
            )
          }
        </div>
      </div>

      <div className="w-full  flex flex-col mt-8 ">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl"> Top Artists </h2>
            <Link to='/top-artists'> <p className="text-gray-300 text-base cursor-pointer">See More </p></Link>

          </div>

          <Swiper slidesPerView="auto" spaceBetween={15} freeMode centeredSlides centeredSlidesBounds modules={[FreeMode]} className="mt-4">
            
            {
              topPlays.map(
                eachSlide => (
                  <SwiperSlide key={eachSlide.key } style={{width:'25%',height:'auto'}} className="shadow-lg rounded-full animate-slideright">
                    <Link to={`/artists/${eachSlide.artists[0].adamid}`}>
                      <img src={eachSlide?.images?.background}  alt="nameartists" className="rounded-full w-full object-cover"/>
                    </Link>
                  </SwiperSlide>
                )
              )
            }
          </Swiper>
      </div>

    </div>
  )
}

export default TopPlay;
