'use client';

import { useStore } from "@/store";
import { ProductGridItem } from "./ProductGridItem";
import { Product, Variation } from "@/interfaces";
import { Modal } from "@/components/modal/Modal";
import { useEffect, useState } from "react";


interface Props {
  products: Product[],
  variantes:any[]


}

const ProductsGrid = ({products,variantes}:Props) => {


  const [productsList, setproductsList] = useState<Product[]>()

  useEffect(() => {
    setproductsList(products)
      
  }, [products])

  const isModalOpen = useStore(state => state.isModalOpen)
  

  return (
    <div>
      {
        productsList && (
          <div className=" grid grid-cols-2 sm:grid-cols-3 gap-10 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)]">
            {
              productsList.map((product: Product) => (
                <ProductGridItem key={product.id} product={product} id={products.indexOf(product)}/>
              ))

            }
            {
              isModalOpen && (
                <div>
                  <Modal products={products} variantes={variantes}/>
                </div>
              )
            }
          </div>
        )
      }
    </div>


  )
}


export default ProductsGrid