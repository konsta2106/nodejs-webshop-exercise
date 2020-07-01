const mongo = require('../util/database')
const mongoDB = require('mongodb')

module.exports = class Product {
    constructor(title, imageUrl, description, price, id) {
        this.title = title,
        this.imageUrl = imageUrl,
        this.description = description,
        this.price = price,
        this._id =  new mongoDB.ObjectID(id)
    }
    
    save() {
        const db = mongo.getDb()
        let dbOp
        if (this._id) {
            dbOp = db
                .collection('products')
                .updateOne({ _id: this._id }, { $set: this })
        } else {
            dbOp = db
                .collection('products')
                .insertOne(this)
        }
        return dbOp
            .then(result => {
            })
            .catch(err => {
                console.log(err)
            })
    }

    static fetchall() {
        const db = mongo.getDb()
        return db.collection('products')
            .find()
            .toArray()
            .then(result => {
                return result
            })
            .catch(err => console.log(err))
    }

    static findProductById(prodId) {
        const db = mongo.getDb()
        return db.collection('products')
            .find({ _id: new mongoDB.ObjectID(prodId) })
            .next()
            .then(product => {
                return product
            })
            .catch(err => console.log(err))
    }
}