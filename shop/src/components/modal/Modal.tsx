'use client';

import {  useStore } from "@/store";
import { LiaWindowCloseSolid } from "react-icons/lia"
import { Product } from "@/interfaces";

import { SliderImg } from "../product/slider-img/SliderImg";

interface Props {
  product: Product;
  
}


export const Modal = ({ product}: Props) => {
  
  
  const closeModal=useStore(state=>state.closeModal)
  

  return (
    <div className="fixed h-[95vh] w-[95vw] sm:w-[640px] md:w-[750px] px-4 inset-x-0 inset-y-0  mx-auto my-auto bg-slate-500 z-20 overflow-y-scroll no-scrollbar  overflow-x-scroll transform transition-all">
        <div className=" rounded-md overflow-hidden ">
          <LiaWindowCloseSolid
            className=" text-red-300 absolute w-10 h-10 z-30 right-0 cursor-pointer"
            onClick={() => closeModal()}
          />
          <SliderImg
            id={product.id}
            images={product.images}
            atributos={product.attributes}
            />
          </div>
          
        </div>
  )
}
