import { useState, useContext } from "react"
import {ACTION_TYPES, StoreContext} from "../src/pages/_app"


// function to retrieve latlong of user
const useTrackLocation = ()=>{
    // state to track if their is a error and show the error message
    const [locationErrorMsg,setLocationErrorMsg] = useState("")
    // const [latLong, setLatLong] = useState("")
    // State to show if a user is finding location or not
    const [isFindingLocation, setIsFindingLocation] = useState(false)

    // declare the dispatch function to access all the data in Context
    const {dispatch} = useContext(StoreContext)

    // Success handler
    const success = (position)=>{
        const coord = position.coords
        const latitude = coord.latitude
        const longitude = coord.longitude

        //setLatLong(`${latitude},${longitude}`)
        // call dispatch from context
        dispatch({
            // Set values from the LatLong type
            type: ACTION_TYPES.SET_LAT_LONG,
            // set the latLong using the payload
            payload: {latLong: `${latitude},${longitude}`},
        })
        setIsFindingLocation(false)
        setLocationErrorMsg("")
    }

    // Error handler
    const error = ()=>{
        setIsFindingLocation(false)
        setLocationErrorMsg("Unable to retrieve your location")
    }

    // Track handler location
    const handleTracLocation =()=>{
        // Set findinglocation to true when button is clicked
        setIsFindingLocation(true)
        
        if(!navigator.geolocation){
            // message to show to user if their is an issue with their browser
            setLocationErrorMsg("Geolocation had an issue, seems your browser is not supported")
            setIsFindingLocation(false)
        }else{
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }

    return {
        //latLong,
        handleTracLocation,
        locationErrorMsg,
        isFindingLocation
    }
}

export default useTrackLocation