import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = (props) => {
  const dispatch = useDispatch() 
  
  const { eachItem,isPlaying,activeSong } = props
 
  const imageSource = eachItem.images?.background

  const handlePauseClick = () =>{
    dispatch(playPause(false))
    console.log("handle pause ")
  }

  const handlePlayClick = () => {
    console.log("handle play")
    dispatch(setActiveSong({eachItem}))  
    dispatch(playPause(true)) 
  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 
  backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group ">
        <div className={`absolute inset-0 justify-center items-center 
        bg-black bg-opacity-50 group-hover:flex 
         ${false ? 'flex bg-black bg-opacity-70' : 'hidden'}  `} >

          <PlayPause eachItem={eachItem} isPlaying={isPlaying} activeSong={activeSong} handlePause={handlePauseClick} handlePlay={handlePlayClick} /> 
        </div>
        <img src={imageSource} alt=" Song Image" />
      </div>

      <div className="mt-4 flex flex-col ">
        <p className="font-semibold text-lg text-white font-mono truncate"><Link to={`/songs/${eachItem.key}`}> {eachItem.title} </Link></p>
        <p className="text-sm truncate text-gray-300 mt-1"> {eachItem.subtitle}</p>
      </div>

    </div>
  )
}

export default SongCard;
