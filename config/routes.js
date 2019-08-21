const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../app/middlewares/authentication')




const userController = require('../app/controllers/userController')
const categoryController = require('../app/controllers/categoryController')
const productController = require('../app/controllers/productController')
const cartItemsController = require('../app/controllers/cartItemsController')
const addressController = require('../app/controllers/addressController')
const ordersController = require('../app/controllers/orderController')




router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.post('/users/account', authenticateUser, userController.account)
router.post('/users/logout', authenticateUser, userController.logout)

router.get('/categories', authenticateUser, categoryController.list)
router.post('/categories', authenticateUser, categoryController.create)
router.get('/categories/:id', authenticateUser, categoryController.show)
router.put('/categories/:id', authenticateUser, categoryController.update)
router.delete('/categories/:id', authenticateUser, categoryController.destroy)

router.get('/products', authenticateUser, productController.list)
router.post('/products', authenticateUser, productController.create)
router.get('/products/:id', authenticateUser, productController.show)
router.put('/products/:id', authenticateUser, productController.update)
router.delete('/products/:id', authenticateUser, productController.destroy)

router.get('/cartItems', authenticateUser, cartItemsController.list)
router.post('/cartItems', authenticateUser, cartItemsController.create)
router.get('/cartItems/:id', authenticateUser, cartItemsController.show)
router.put('/cartItems/:id', authenticateUser, cartItemsController.update)
router.delete('/cartItems/:id', authenticateUser, cartItemsController.destroy)

router.get('/address', authenticateUser, addressController.list)
router.post('/address', authenticateUser, addressController.create)
router.get('/address/:id', authenticateUser, addressController.show)
router.put('/address/:id', authenticateUser, addressController.update)
router.delete('/address/:id', authenticateUser, addressController.destroy)

router.get('/orders', authenticateUser, ordersController.list)
router.post('/orders', authenticateUser, ordersController.create)
router.get('/orders/:id', authenticateUser, ordersController.show)
router.put('/orders/:id', authenticateUser, ordersController.update)
router.delete('/orders/:id', authenticateUser, ordersController.destroy)




module.exports = router