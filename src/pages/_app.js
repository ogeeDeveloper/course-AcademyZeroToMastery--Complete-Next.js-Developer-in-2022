import { createContext } from 'react/cjs/react.production.min'
import '../styles/globals.css'

// Create Context for the Coffee store app
const StoreContext =createContext();

// Create the provider to provide the context accross all pages that needs it
const StoreProvider = (({children})=>{
  // the initial state for the application 
  const initialState = {
    "latLong": "",
    coffeeStores: []
  }
  return (
    <StoreContext.Provider value={{state: initialState}}>
      {children}
    </StoreContext.Provider>
  )
})

function MyApp({ Component, pageProps }) {
  // Wrap entire app with the storeProvider
  return <StoreProvider><Component {...pageProps} /></StoreProvider>
}

export default MyApp
