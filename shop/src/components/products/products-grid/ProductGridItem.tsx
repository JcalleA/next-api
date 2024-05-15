'use client';



import { Modal } from "@/components/modal/Modal";
import { Product } from "@/interfaces";
import { useStore } from "@/store";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


interface Props {
  product: Product,
  id: number
}

export const ProductGridItem = ({ product, id }: Props) => {

  const [displayImage, setdiplayImage] = useState(product.images[0].src)


  return (
    <div>
      <div className=" rounded-md overflow-hidden">
        <div className=" overflow-hidden relative mx-auto w-[90%] sm:w-[70%] object-fill rounded-lg">
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
            />
          </Link>
        </div>

      </div>
      <div>
      </div>
    </div>

  )
}
