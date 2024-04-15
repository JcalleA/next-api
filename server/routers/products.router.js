const express = require('express')
const producController=require('../controllers/product.controller')

const router = express.Router()




router.get('/setproduct/:id/:variation', producController.setProduct);
router.get('/list', producController.getProducts);



module.exports = router;