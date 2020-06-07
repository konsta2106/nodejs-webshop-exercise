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
            console.log(result)
            return result
        })
        .catch(err => console.log(err))
    }
}