'use client';



import { Modal } from "@/components/modal/Modal";
import { Product } from "@/interfaces";
import { useStore } from "@/store";
import Image from "next/image";
import { useState } from "react";


interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

  const isModalOpen=useStore(state=>state.isModalOpen)

  const [displayImage, setdiplayImage] = useState(product.images[0].src)
  const openModal=useStore(state=>state.openModal)
  const setModalId=useStore(state=>state.setModalId)
  
  return (
    <div>
      <div className=" rounded-md overflow-hidden">
        <Image
          src={`${displayImage}`}
          alt={product.name}
          className=" w-full object-cover"
          width={500}
          height={500}
          onMouseEnter={() => setdiplayImage(product.images[1].src)}
          onMouseLeave={() => setdiplayImage(product.images[0].src)}
          onClick={()=>{
            setModalId(product.id)
            openModal()
          }}
        />
      </div>
      <div>
      </div>
      </div>
    
  )
}
