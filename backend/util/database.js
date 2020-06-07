const { MongoClient } = require("mongodb");
require('dotenv').config()

let _db

const mongoConnect = callback => {
    // Replace the following with your Atlas connection string                                                                                                                                        
    const url = process.env.DB_URL
    const client = new MongoClient(url, { useUnifiedTopology: true });
    
    client.connect()
    .then(client => {
        console.log('Connected')
        _db = client.db()
        callback()
    })
    .catch(error => {
        console.log(error)
        throw error
    })
}

const getDb = () => {
    if(_db) {
        return _db
    }
    throw 'No database found'
}

module.exports = {
    mongoConnect,
    getDb
}