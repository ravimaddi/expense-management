const express = require('express')
const router = express.Router()
const userController= require('../app/controllers/usersController')
const userAuthentication=require('../app/middlewares/authentication')
const budgetsController= require('../app/controllers/budgetsController')
const categoryController= require('../app/controllers/categoriesController')
const expenseController=require('../app/controllers/expensesController')
const upload = require('../app/middlewares/imageUpload')

router.post('/users/register',userController.register) 
router.post('/users/login',userController.login)
router.get('/users/account',userAuthentication,userController.account)
router.delete('/users/logout',userAuthentication,userController.logout)
router.post('/users/image',userAuthentication,upload.single('file'),userController.image)

router.post('/budget',userAuthentication,budgetsController.createBudget)
router.get('/budget',userAuthentication,budgetsController.showBudget)
router.put('/budget/:id',userAuthentication,budgetsController.updateBudget)

router.post('/category',userAuthentication,categoryController.createCategory)
router.get('/category',userAuthentication,categoryController.showCategory)
router.put('/category/:id',userAuthentication,categoryController.updateCategory)
router.delete('/category/:id',userAuthentication,categoryController.destroyCategory)

router.get('/expense',userAuthentication,expenseController.list)
router.post('/expense',userAuthentication,expenseController.create)
router.put('/expense/:id',userAuthentication,expenseController.update)
router.delete('/expense/:id',userAuthentication,expenseController.destroy)

module.exports=router