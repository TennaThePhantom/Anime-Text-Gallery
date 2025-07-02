import { ImVolumeHigh } from "react-icons/im";
import { ImVolumeMedium } from "react-icons/im";
import { ImVolumeLow } from "react-icons/im";
import { ImVolumeMute } from "react-icons/im"; // volume is basically at zero not muted 
import { ImVolumeMute2 } from "react-icons/im";
import "../CSS/Volume.css"; 




function Volume(){
    return (
        <div className="volume-container">
            <ImVolumeMute className="volume-icon"/>
        </div>
    )
}

export default Volume;