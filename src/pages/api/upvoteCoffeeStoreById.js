import { getRecords, table, findRecordByFilter } from "../../lib/airtable"

const upvoteCoffeeStoreById=async(req, res)=>{
    if(req.method === "PUT"){
        // Recieve the id from the request body
        const {id} = req.body

        try{
            if(id){
                // res.json({message: "Yay it worked", id})

                // check ifm record exists
                const records = await findRecordByFilter(id)
                if(records.length !==0){
                    const record = records[0]
                    // Parse ther string to a integer and increment by 1
                    const calculateVoting = parseInt(record.voting) + parseInt(1)
                    // console.log({calculateVoting}, record.ID)

                    // Update record
                    const updateVotingRecord = table.update([
                        {
                            id: record.recordId,
                            fields: {
                                voting: calculateVoting
                            },
                        },
                    ])

                    if(updateVotingRecord){
                        // Minify the record
                        const minifiedReocords = getRecords(updateVotingRecord)
                        res.json(minifiedReocords)
                    }
                    // res.json(records)
                }else{
                    res.status(404)
                    res.json({mesage: "No coffee store was found with that id",id});
                }
            }else{
                res.status(400)
                res.json({mesage: "Please provide a id"});
            }
        }catch(err){
            res.status(500)
            res.json({message: "Oh no, something went wrong while upvoting coffee store",err})
        }

        // Check if id already exists
    }else{
        res.status(500).json({mesage: "only the PUT method is allowed"});
    }
}

export default upvoteCoffeeStoreById;