'use client';




import { Product } from "@/interfaces";
import { useStore } from "@/store";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";


interface Props {
  product: Product,
  id: number
}

export const ProductGridItem = ({ product, id }: Props) => {

  const [displayImage, setdiplayImage] = useState(product.images[0].src)


  return (
    <div className=" w-[100%]">
      <div className=" mx-auto w-[90%]">

      <div className=" rounded-md shadow-md bg-slate-300 overflow-hidden ">
        <div className=" overflow-hidden relative shadow-md mx-auto w-[100%] sm:w-[90%] object-fill  rounded-lg">
          <span
            className={
              clsx(" bg-red-600 h-[50px] w-[120px] content-end text-center box absolute top-[-17px] left-[-50px] transform -rotate-45 text-sm font-extrabold ",
              )
            }
          >Oferta</span>
          <Link href={`/?id=${id}&showmodal=true`}>
            <Image
              src={`${displayImage}`}
              alt={product.name}
              className=" w-full object-cover"
              width={600}
              height={600}
              onMouseEnter={() => setdiplayImage(product.images[1].src)}
              onMouseLeave={() => setdiplayImage(product.images[0].src)}
              onTouchStart={()=>setdiplayImage(product.images[1].src)}
              onTouchEnd={()=>setdiplayImage(product.images[0].src)}
            />
          </Link>
        </div>
        <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <span className="block text-pink-500 text-lg mt-4">$ {new Intl.NumberFormat().format(parseInt(product.price))}</span>
                <div className="  text-center">
                <Link className=" w-[80%] shadow-lg mt-4 inline-block bg-pink-500 text-white py-2 px-4 rounded-full text-sm hover:bg-pink-600" href={`/?id=${id}&showmodal=true`}><MdOutlineAddShoppingCart
                                    className=" mx-auto w-8 h-8 text-black" /></Link>
                </div>
                
            </div>
      </div>
 
      </div>
      <div>
      </div>
    </div>

  )
}
