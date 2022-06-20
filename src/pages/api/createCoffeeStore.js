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
        // Get the json to be added by access the body of the request
        const {ID, name, address, neighborhood, voting, imageURL} = req.body
        try{
            // Find a Record
            const findCoffeeStoreRecords =  await table.select({
                filterByFormula: `ID=${ID}`,
            }).firstPage()

            console.log({findCoffeeStoreRecords})

            if(findCoffeeStoreRecords.length !==0){
                // Transform data that is been retrieved from the API
                    const records = findCoffeeStoreRecords.map(data=>{
                        // Spread the fields inside the object soi we can get back all data in the fields object
                        return{
                            ...data.fields,
                        }
                    })
                res.json(records)
            }else{
                //Create a record
                const createRecords = await table.create([
                    {
                        fields:{
                            // Since key and value is the same I can just use the vatiable itself that was destructred from the request of the body rather than "name: nameOfCoffeeStore"
                            ID,
                            name,
                            address,
                            neighborhood,
                            voting,
                            imageURL,
                        }
                    }
                ])
                 // Transform data that is been retrieved from the API
                 const records = createRecords.map(data=>{
                    // Spread the fields inside the object soi we can get back all data in the fields object
                    return{
                        ...data.fields,
                    }
                })

                res.json({message: "Created a record", record})

            }
        }catch(error){
            console.log("Their was an error, please try again later", error)
            res.status(500).json({message: "Something went wrong, please try again later", error})
        }
    }else{
        res.status(500).json({mesage: "The GET method is not allowed"});
        console.log("You are using the wrong request method")
    }
    // return res.json({message: "Hi there api configured succesfully"})
}

export default createCoffeeStore