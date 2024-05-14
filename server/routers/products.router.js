const express = require('express')
const producController=require('../controllers/product.controller')

const router = express.Router()




router.get('/getvariants/', producController.getVariants);
router.get('/list', producController.getProducts);
router.get('/listShipingMethods', producController.listShipingMethods);


router.post('/createorder',producController.createOrder)



module.exports = router;