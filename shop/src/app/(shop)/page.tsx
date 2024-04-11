'use server'

import ProductsGrid from "@/components/products/products-grid/ProductsGrid";
import { api } from "../api/getProducts";
import { SideBar } from "@/components";





export default async function Home() {
  const res = await api.get("products")
  const { data } = res
  
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-5">
      <ProductsGrid products={data} />
      <SideBar products={data} />



    </div>
  )
}

