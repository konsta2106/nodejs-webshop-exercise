const path = require('path')
const fs = require('fs')
const Cart = require('./cart')

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

const getProductFromFiles = (cb) => {
    fs.readFile(p, (error, contentData) => {
        if (error) {
            cb([])
        } else {
            cb(JSON.parse(contentData))
        }
        
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl,
        this.description = description,
        this.price = price
    }

    static delete(id) {
        getProductFromFiles(products => {
            const product = products.find(prod => prod.id === id)
            const updatedProducts = products.filter(p => p.id !== id)
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteCart(id, product.price)
                }
            })
        })
    }

    save() {
        getProductFromFiles(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products]
                updatedProducts[existingProductIndex] = this
                fs.writeFile(p, JSON.stringify(updatedProducts), (error) => {
                    console.log(error)
                })
            } else {
                this.id = Math.random().toString()
                products.push(this)
                fs.writeFile(p, JSON.stringify(products), (error) => {
                    console.log(error)
                })
            }
            
        })
    }

    static fetchall(cb) {
        getProductFromFiles(cb)
    }

    static findProductById(id, cb) {
        getProductFromFiles(products => {
            const product = products.find(p => p.id === id)
            cb(product)
        })
    }
}