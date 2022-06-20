//const Airtable = require('airtable')
import Airtable from "airtable"

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});

// The base is used to call the API routes
const base = Airtable.base(process.env.AIRTABLE_BASE_ID)

const table = base('cofee-stores')

console.log({table})

const createCoffeeStore = async(req, res)=>{
    // Check to see if method is POST
    if(req.method === "POST"){
        // Find a Record
        const findCoffeeStoreRecords =  await table.select({
            filterByFormula: `id="0"`,
        }).firstPage()

        console.log({findCoffeeStoreRecords})

        if(findCoffeeStoreRecords.length !==0){
            res.json(findCoffeeStoreRecords)
        }else{
            //Create a record
            res.json({message: "Create a record"})
        }
    }
    // return res.json({message: "Hi there api configured succesfully"})
}

export default createCoffeeStore