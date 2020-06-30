const mongo = require('../util/database')
const mongoDB = require('mongodb')

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title
        this.imageUrl = imageUrl,
        this.description = description,
        this.price = price
    }
    save() {
        const db = mongo.getDb()
        return db.collection('products')
        .insertOne(this)
        .then(result => {
        })
        .catch(err => {
            console.log(err)
        })
    }

    static fetchall() {
        console.log('inside fetchall')
        const db = mongo.getDb()
        return db.collection('products')
        .find()
        .toArray()
        .then(result => {
            console.log(result)
            return result
        })
        .catch(err => console.log(err))
    }

    static findProductById(prodId) {
        const db = mongo.getDb()
        return db.collection('products')
        .find({_id: new mongoDB.ObjectID(prodId)})
        .next()
        .then(product => {
            return product
        })
        .catch(err => console.log(err))
    }
}