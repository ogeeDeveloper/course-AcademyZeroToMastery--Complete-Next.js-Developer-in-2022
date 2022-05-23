import { useState } from "react"


// function to retrieve latlong of user
const useTrackLocation = ()=>{
    // state to track if their is a error and show the error message
    const [locationErrorMsg,setLocationErrorMsg] = useState("")
    const [latLong, setLatLong] = useState("")

    // Success handler
    const success = (position)=>{
        const latitude = position.coord.latitude
        const longitude = position.coord.longitude

        setLatLong(`${latitude},${longitude}`)
        setLocationErrorMsg("")
    }

    // Error handler
    const error = ()=>{
        setLocationErrorMsg("Unable to retrieve your location")
    }

    // Track handler location
    const handleTracLocation =()=>{
        if(!navigator.geolocation){
            // message to show to user if their is an issue with their browser
            setLocationErrorMsg("Geolocation had an issue, seems your browser is not supported")
        }else{
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }

    return {
        latLong,
        handleTracLocation,
        locationErrorMsg
    }
}

export default useTrackLocation