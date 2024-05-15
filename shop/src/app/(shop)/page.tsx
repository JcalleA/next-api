'use server'

import ProductsGrid from "@/components/products/products-grid/ProductsGrid";
import { SideBar } from "@/components";
import { api } from "../config/wooapi";
import { Checkout } from "@/components/checkout/Checkout"; 
import { Mensaje } from "@/components/mensajes/Mensaje";




export default async function Home() {
  
  const products= await api.get('products')
  const variantesList= await fetch(`http://localhost:4000/products/getvariants`)
  const variantes= await variantesList.json()
  
  
  
  return (
    <div className=" min-h-screen flex-col items-center justify-between ">
      <Mensaje/>
      <ProductsGrid products={products.data} variantes={variantes}/>
      <SideBar/>
      <Checkout/>
    </div>
  )
}

