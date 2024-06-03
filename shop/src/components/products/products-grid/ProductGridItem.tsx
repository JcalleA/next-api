"use client";

import { Product } from "@/interfaces";
import { useStore } from "@/store";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";

interface Props {
  product: Product;
  id: number;
}

export const ProductGridItem = ({ product, id }: Props) => {
  const [displayImage, setdiplayImage] = useState(product.images[0].src);

  return (
    <div className=" w-[100%] h-full">
      <div className=" mx-auto w-[90%] h-full">
        <div className=" rounded-md h-full shadow-md shadow-black bg-slate-300 overflow-hidden ">
          <div className="  overflow-hidden relative  mx-auto w-[100%] sm:w-[90%]  rounded-lg">
            <span
              className={clsx(
                " bg-red-600 h-[50px] w-[120px] content-end text-center box absolute top-[-17px] left-[-50px] transform -rotate-45 text-sm font-extrabold"
              )}
            >
              Oferta
            </span>
            <Link href={`/?id=${id}&showmodal=true`}>
              <Image
                src={`${displayImage}`}
                alt={product.name}
                className=" w-full"
                width={700}
                height={700}
                
                onMouseEnter={() => setdiplayImage(product.images[1].src)}
                onMouseLeave={() => setdiplayImage(product.images[0].src)}
                onTouchStart={() => setdiplayImage(product.images[1].src)}
                onTouchEnd={() => setdiplayImage(product.images[0].src)}
              />
            </Link>
          </div>
          <div className="h-[30%] grid grid-cols-1 content-between pb-2 ">
            <div>
              <h2 className="text-xs  text-center font-semibold text-gray-800">
                {product.name}
              </h2>
            </div>
            <div className=" flex justify-around">
              <span className="block text-pink-800  line-through text-sm mt-4">
                $ {new Intl.NumberFormat().format(30000)}
              </span>
              <span className="block text-pink-500 text-sm mt-4">
                $ {new Intl.NumberFormat().format(parseInt(product.price))}
              </span>
            </div>
            <div className="  text-center  self-end ">
              <Link
                className=" w-[70%]  mb-3 shadow-black align-baseline shadow-md border-2 border-black mt-4 inline-block bg-pink-500 text-white py-1 px-4 rounded-full text-lg hover:bg-pink-600"
                href={`/?id=${id}&showmodal=true`}
              >
                Ver
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
