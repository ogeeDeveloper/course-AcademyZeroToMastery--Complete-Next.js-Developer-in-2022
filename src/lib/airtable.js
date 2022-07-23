//const Airtable = require('airtable')
import Airtable from "airtable"

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});

// The base is used to call the API routes
const base = Airtable.base(process.env.AIRTABLE_BASE_ID)

const table = base('cofee-stores')

// Get miified Record
const getMinifiedRecord = record=>{
    return{
        recordId:record.id,
        ...record.fields,
    }
}

// Gets record from table
const getRecords = records =>{
    // Transform data that is been retrieved from the API
    return records.map(record=>
        // Spread the fields inside the object soi we can get back all data in the fields object
        getMinifiedRecord(record)
    )
}

const findRecordByFilter = async(id)=>{
    // Find a Record
    const findCoffeeStoreRecords =  await table.select({
        filterByFormula: `id="${id}"`,
    }).firstPage()

    // Retrieve store ID exists
    return getRecords(findCoffeeStoreRecords)
}


export {
    table,
    getRecords,
    findRecordByFilter
}