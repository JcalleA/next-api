'use client';

import { LiaWindowCloseSolid } from "react-icons/lia"
import { Product, Variation } from "@/interfaces";
import { SliderImg } from "../product/slider-img/SliderImg";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  products: Product[],
  variantes: [Variation[]],
}


export const Modal = ({ products, variantes }: Props) => {

  
  const searchParams = useSearchParams()
  const router = useRouter()
  const [dataModal, setdataModal] = useState<Product>()
  const [variations, setvariations] = useState<[Variation[]]>()
  const ModalId = parseInt(searchParams.get('id')!)
  



  useEffect(() => {
      setvariations(variantes)
      setdataModal(products[ModalId])
  }, [ModalId])


  return (
    <div className="fixed  h-[100vh] w-[100vw] top-0 rounded-md sm:w-[640px] md:w-[750px] px-4 inset-x-0 inset-y-0  mx-auto my-auto bg-gradient-to-r from-teal-500 to-cyan-600 z-20 overflow-y-scroll no-scrollbar  overflow-x-scroll transform transition-all">
      <div className=" rounded-md h-screen">
        <LiaWindowCloseSolid
          className=" text-red-300 absolute w-10 h-10 z-30 right-0 cursor-pointer"
          onClick={router.back}
        />
        {
          dataModal && variations && (
            <SliderImg
              product={dataModal}
              variantes={variations[ModalId]}
            />
          )
        }

      </div>

    </div>
  )
}
