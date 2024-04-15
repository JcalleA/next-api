'use client';

import { useStore } from "@/store";
import { LiaWindowCloseSolid } from "react-icons/lia"
import { Product, Variation } from "@/interfaces";

import { SliderImg } from "../product/slider-img/SliderImg";
import { useEffect, useState } from "react";

interface Props {
  products: Product[],
  variantes:any[]

}

export const Modal = ({products,variantes}:Props) => {

  const ModalId = useStore(state => state.ModalId)
  const closeModal = useStore(state => state.closeModal)
  const modalState = useStore(state => state.isModalOpen)
  const [productsList, setproductsList] = useState<Product[]>([])
  const [dataModal, setdataModal] = useState<Product>()

  useEffect(() => {
      setproductsList(products)
      
  }, [products])
  
  useEffect(() => {
      setdataModal(products[ModalId])
  }, [ModalId])


  return (
    <div className="fixed mt-5 h-[95vh] w-[95vw] sm:w-[640px] md:w-[750px] px-4 inset-x-0 inset-y-0  mx-auto my-auto bg-slate-500 z-20 overflow-y-scroll no-scrollbar  overflow-x-scroll transform transition-all">
      <div className=" rounded-md overflow-hidden ">
        <LiaWindowCloseSolid
          className=" text-red-300 absolute w-10 h-10 z-30 right-0 cursor-pointer"
          onClick={() => closeModal()}
        />
        {
          dataModal && (
            <SliderImg
              product={dataModal}
              variantes={variantes[ModalId]}
            />
          )
        }

      </div>

    </div>
  )
}
