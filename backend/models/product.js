const mongo = require('../util/database')

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
            console.log(result)
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
            console.log('inside product model fetchall', result)
            return result
        })
        .catch(err => console.log(err))
    }

    static findProductById(prodId) {
        const db = mongo.getDb()
        return db.collection('products')
        .find({_id: prodId})
        .next()
        .then(product => {
            console.log(product)
            return product
        })
        .catch(err => console.log(err))
    }
}