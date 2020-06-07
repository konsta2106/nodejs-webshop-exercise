const { MongoClient } = require("mongodb");

let _db

const mongoConnect = callback => {
    // Replace the following with your Atlas connection string                                                                                                                                        
    const url = "mongodb+srv://konsta:konkom221@gettingstarted-8mbad.azure.mongodb.net/test?retryWrites=true&w=majority";
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