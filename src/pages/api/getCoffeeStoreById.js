import {findRecordByFilter } from "../../lib/airtable"

const getCoffeeStoreById = async(req, res) => {
    // Takes in ID
    const {id} = req.query
    console.log({id})

    // Good practice to wrap code in try/catch block to catch any errors that might occurs
    try{
        if(id){
            //Set te record to the findRecordByFilter fuction
            const records = await findRecordByFilter(id)
            if(records.length !== 0){
                //Return the Response as JSON
                res.json(records)
            }else{
                // If ID wasnt found then show a message saying not found
                res.json({message: `ID could not be found`})
            }
        }else{
            res.status(400)
            res.json({message: `ID is missing`})
        }
    }catch(err){
        res.status(500)
        res.json({message: "There was an an error while getting that coffee store", err})
    }
}

export default getCoffeeStoreById