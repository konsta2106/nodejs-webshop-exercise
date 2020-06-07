const Product = require('../models/product')
const Cart = require('../models/cart')

 exports.getProducts = (req, res, next) => {
    Product.fetchall()
    .then(products => {
      res.render('shop/products', {
        prods: products,
        pageTitle: 'Shop',
        path: '/shop/products',
      })
    })
    .catch(err => console.log(err))
 }


  exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId
    Product.findProductById(productId, product => {
      res.render('shop/product-details', {
        prods: product,
        pageTitle: 'Details',
        path: '/shop/product-info'
      })
      console.log(product)
    })
  }

  exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    console.log(prodId)
    Product.findProductById(prodId, (product) => {
      Cart.addProduct(prodId, product.price)
      console.log(prodId, product.price)
    })
    res.redirect('/cart')
  }

  exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
      Product.fetchall(products => {
        const cartProds = []
        for (product of products) {
          const cartProductData = cart.products.find(prod => prod.id === product.id)
          if(cartProductData) {
            cartProds.push({productData: product, qty: cartProductData.qty})
          }
        }
        res.render('shop/cart', {
          pageTitle: 'Cart',
          path: '/shop/cart',
          products: cartProds,
          formsCSS: true,
          productCSS: true,
          activeAddProduct: true
        });
      })      
    })   
  }

  exports.postCartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId
    Product.findProductById(prodId, product => {
      Cart.deleteCart(prodId, product.price)
      res.redirect('/cart')
    })
  }

  exports.getIndex = (req, res, next) => {
    Product.fetchall()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      })
    })
    .catch(err => console.log(err))
 }

  exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      pageTitle: 'checkout',
      path: '/shop/checkout',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }

  exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
      pageTitle: 'orders',
      path: '/shop/orders',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }

  // exports.getAllProductsPage = (req, res, next) => {
  //   res.render('shop/products', {
  //     pageTitle: 'Products',
  //     path: 'shop/products',
  //     formsCSS: true,
  //     productCSS: true,
  //     activeAddProduct: true
  //   });
  // }



  
