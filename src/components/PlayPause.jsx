import {FaPauseCircle,FaPlayCircle} from 'react-icons/fa'

const PlayPause = (props) => {

  const {eachItem,handlePause,handlePlay,isPlaying,activeSong} = props
  
  return(
  ((isPlaying && activeSong?.title) === eachItem.title ) ? 

  (<FaPauseCircle size={40} color='white' onClick={handlePause} /> ) 
  
  : (<FaPlayCircle size={40} color='white'  onClick={handlePlay}/>)
 )
}

export default PlayPause;

