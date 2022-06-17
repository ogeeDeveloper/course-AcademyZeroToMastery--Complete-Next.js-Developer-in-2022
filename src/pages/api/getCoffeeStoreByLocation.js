import { FetchCoffeeStore } from "../../lib/coffee-stores"

// API to retrieve the coffee stores
const handler = async(req, res)=>{
    // Configure latlongf and limit
    try {
        const {latLong, limit} = req.query // get latlong and query from query in URL

        const response = await FetchCoffeeStore(latLong, limit) 
        res.status(200)
        res.json(response)
    } catch (error) {
        console.log("Their was an error while fetching", eror)
        res.status(500)
        res.json({message: "🙄Opps, there was an error on the server", error})
    }
    
    // return
}

export default handler