'use client';

import { useStore } from "@/store";
import { ProductGridItem } from "./ProductGridItem";
import { Product } from "@/interfaces";
import { Modal } from "@/components/modal/Modal";





interface Props {
  products: Product[],
  
  
}

const ProductsGrid = ({products}:Props) => {
  const isModalOpen = useStore(state => state.isModalOpen)
  const ModalId = useStore(state => state.ModalId)
  const dataModal = products.find(product => product.id === ModalId)


  return (
    <div className=" grid grid-cols-2 sm:grid-cols-3 gap-10 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)]">
      {
        products.map((product: Product) => (
          <ProductGridItem key={product.id} product={product} />
        ))

      }
      {
        isModalOpen && (

          <div>
            <Modal product={dataModal! } />
          </div>

        )
      }
    </div>
  )
}


export default ProductsGrid