import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { DetailsHeader,Error,Loader,RelatedSongs } from "../components";

import { setActiveSong,playPause } from "../redux/features/playerSlice";



const SongDetails = () => {
    const dispatch = useDispatch()
    const{songid} = useParams()  
    console.log(songid)

    const {activeSong , isPlaying} = useSelector(state => state.player)

    
    return(
    <div className="flex flex-col">

        <div className="mb-10 ">
            <h2 className="text-white text-3xl font-bold"> Lyrics:</h2>

            <div className="mt-5 ">
               <p className="text-gray-300 text-base">
                 No Lyrics Found!
               </p>
            </div>
        </div>

    </div>
    )
};

export default SongDetails;
