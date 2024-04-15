
const config = require('../config');
const WooCommerceRestApi =  
    require("@woocommerce/woocommerce-rest-api").default; 


// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
  url: config.URLWOO,
  consumerKey: config.CONSUMERKEY,
  consumerSecret: config.CONSUMERSECTRET,
  version: "wc/v3",
});


module.exports = api; 