import { createContext, useReducer } from 'react'
import '../styles/globals.css'

// Create Context for the Coffee store app
export const StoreContext = createContext();

// Create action types to be used in reducer
export const ACTION_TYPES={
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEEE_STORES'
}

// Create reducer
const storeReducer = (state, action)=>{
  switch(action.type){
    case ACTION_TYPES.SET_LAT_LONG: {
      return {...state, latLong: action.payload.latLong}
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return {...state, coffeeStores: action.payload.coffeeStores}
    }
    default:
      throw new Error( `Unhandled action type detected: ${action.type}`)
  }
}

// Create the provider to provide the context accross all pages that needs it
const StoreProvider = (({children})=>{
  // the initial state for the application 
  const initialState = {
    latLong: "",
    coffeeStores: []
  }

  // use the reducer using the useReducer
  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
})

function MyApp({ Component, pageProps }) {
  // Wrap entire app with the storeProvider
  return <StoreProvider><Component {...pageProps} /></StoreProvider>
}

export default MyApp
