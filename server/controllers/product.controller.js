const api = require('../config/wooapi')



exports.createOrder=async(req,res)=>{
  const data=req.body
  try {
    api.post("orders", data)
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      res.status(400).send({error:error})
    });
  } catch (error) {
    res.status(500).send({error:error})
  }
}

exports.listShipingMethods=async(req,res)=>{
  
  try {
    api.get("shipping_methods")
  .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      res.json(error)
    });
  } catch (error) {
    res.json(error)
  }
}

exports.getProducts=async(req, res)=>{
    try {
        const datos = await api.get(`products`);
        res.json(datos.data);
      } catch (error) {
        res.json(error);
        
      }
}

exports.getVariants=async(req, res)=> {

  try {
    const products= await api.get(`products`)
    const listaProducts=products.data
    const listaVariantes=[]
      
    for(const producto of listaProducts){
      const variantesData=await api.get(`products/${producto.id}/variations`)
      listaVariantes.push(variantesData.data)
    }
    
      res.json(listaVariantes)
      

  } catch (error) {
    
  }
    
  } 
