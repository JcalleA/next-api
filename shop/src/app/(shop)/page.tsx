'use server'

import ProductsGrid from "@/components/products/products-grid/ProductsGrid";
import { SideBar } from "@/components";
import { api } from "../config/wooapi";
import { Product, Variation } from "@/interfaces";



async function getData() {
  const variationsLis:any=[]
  await api.get('products')
  .then(res=>{
    const {data}=res
    data.map(async (element: Product)=> {
      await api.get(`products/${element.id}/variations`)
      .then(res=>variationsLis.push(res))
  })
  })
  const res2=await api.get('products')
  const {data}=res2
  console.log(data,variationsLis);
  
  return {datos:data,
    variations:variationsLis
  }
}

export default async function Home() {
  const datos=await getData()
  
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-5">
      <ProductsGrid products={datos.datos} variantes={datos.variations}/>
      <SideBar/>
    </div>
  )
}

