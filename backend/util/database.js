const { MongoClient } = require("mongodb");
const db = require('mongodb')


const mongoConnect = callback => {
    // Replace the following with your Atlas connection string                                                                                                                                        
    const url = "mongodb+srv://konsta:konkom221@gettingstarted-8mbad.azure.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(url, { useUnifiedTopology: true });
    
    client.connect()
    .then(client => {
        console.log('Connected')
        callback(client)
    })
    .catch(error => console.log(error))

}

module.exports = mongoConnect