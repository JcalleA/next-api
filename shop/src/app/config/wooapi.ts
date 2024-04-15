import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// initialise the WooCommerceRestApi //
export const api = new WooCommerceRestApi({
  url: process.env.URL!,
  consumerKey: process.env.CONSUMERKEY!,
  consumerSecret: process.env.CONSUMERSECTRET!,
  version: "wc/v3",
});