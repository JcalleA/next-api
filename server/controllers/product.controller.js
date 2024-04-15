const api = require('../config/wooapi')



exports.getProducts=async(req, res)=>{
    try {
        const datos = await api.get(`products`);
        res.json(datos.data);
      } catch (error) {
        res.json(error);
        console.log(error);
      }
}

exports.setProduct=async(req, res)=> {

  const { id, variation } = req.params;

  try {
    const datos = await api.get(`products/${id}/variations`);
    const product = await datos.data.filter((e) => e.name === variation);
    const data = await {
      id: product[0].id,
      stock: product[0].stock_quantity,
      image: { src: product[0].image.src },
      parent_id: product[0].parent_id,
    };
    res.json(data);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}
