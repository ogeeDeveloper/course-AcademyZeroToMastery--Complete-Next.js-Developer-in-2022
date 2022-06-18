//const Airtable = require('airtable')
import Airtable from "airtable"

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});

// Thebase is used to call the API routes
const base = Airtable.base(process.env.AIRTABLE_BASE_ID)