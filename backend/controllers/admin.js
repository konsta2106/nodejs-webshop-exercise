const Product = require('../models/product')

exports.getAddProductPage = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
}

exports.getAdminProducts = (req, res, next) => {
  Product.fetchall((products) => {
    res.render('admin/admin-product', {
      prods: products,
      pageTitle: 'admin prod',
      path: '/admin/admin-product',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    })
  })
}

exports.addProduct = (req, res, next) => {
  const title = req.body.title
  const imgUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  const product = new Product(null, title, imgUrl, description, price)
  product.save()
  res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  console.log(prodId)
  Product.findProductById(prodId, product => {
    if (!product) {
      res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      editing: editMode,
      product: product,
    });
  })
}

exports.postEditProduct = (req, res, next) => {
  console.log(req.body)
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDescription = req.body.description
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice)
  updatedProduct.save()
  res.redirect('/admin/admin-product')

}

exports.postDelete = (req, res, next) => {
   const prodId = req.body.productId
   console.log(prodId)
   Product.delete(prodId)
   res.redirect('/admin/admin-product')
}

