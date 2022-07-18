import {table, getRecords } from "../../lib/airtable"


const createCoffeeStore = async(req, res)=>{
    if(req.method === "POST"){
        // Get the json to be added by access the body of the request
        const {ID, name, address, neighborhood, voting, imageURL} = req.body
        try{
            if(ID){
                // Find a Record
                const findCoffeeStoreRecords =  await table.select({
                    filterByFormula: `id="${ID}"`,
                }).firstPage()

                if(findCoffeeStoreRecords.length !==0){
                    const records = getRecords(findCoffeeStoreRecords)
                    res.json(records)
                }else{
                    if(name){
                        //Create a record
                        const createRecords = await table.create([
                            {
                                fields:{
                                    // Since key and value is the same for IDS I can just use the variable itself that was destructred from the request of the body rather than "name: nameOfCoffeeStore"
                                    ID,
                                    name,
                                    address,
                                    neighborhood,
                                    voting,
                                    imageURL,
                                },
                             },
                        ])
                        // Transform data that is been retrieved from the API
                        const records = getRecords(createRecords)
                        res.json(201)
                        res.json({message: "Created a record successfully", records})
                    }else{
                        res.json(400)
                        res.json({ message: "Name is missing" });
                    }
                }
  
            }else{
                res.status(400).json({message: "Something went wrong, ID is missing", error})
            }
        }catch(error){
            console.log("Their was an error, please try again later", error)
            res.status(500).json({message: "Something went wrong, please try again later", error})
        }
    }else{
        res.status(500).json({mesage: "The GET method is not allowed"});
        console.log("You are using the wrong request method")
    }
}

export default createCoffeeStore