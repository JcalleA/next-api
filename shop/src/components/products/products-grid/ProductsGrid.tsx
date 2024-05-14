'use client';


import { ProductGridItem } from "./ProductGridItem";
import { Product, Variation } from "@/interfaces";
import { Modal } from "@/components/modal/Modal";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import Link from "next/link";
import { GiShoppingCart } from "react-icons/gi";
import { CartState } from "@/store";


interface Props {
  products: Product[],
  variantes:[Variation[]]
}

const ProductsGrid = ({products,variantes}:Props) => {


  const [productsList, setproductsList] = useState<Product[]>()
  const searchParams = useSearchParams()
  const itemsInCart = CartState(state => state.CartItems)
  const isModalOpen = searchParams.get('showmodal')
  const [animation, setanimation] = useState('')

  useEffect(() => {
    setproductsList(products)
      
  }, [products])

  useEffect(() => {
    setanimation(' animate-rotate-in')
    setTimeout(() => {
      setanimation('')
    }, 500);
  }, [itemsInCart])
  
  
  


  return (
    <div className=" mt-7 mb-10">
      <div className={ `${animation} fixed bottom-1 right-0  w-[5%] mr-9 z-30` }>
                    <Link 
                    className=" w-auto m-0 p-0"
                    href="/?showmenu=true"
                    >
                        <GiShoppingCart className=" w-10 h-10 p-1 ml-1 cursor-pointer  bg-rose-500 rounded-full  transition-all hover:scale-150 "
                        />
                        <span className="absolute text-xl font-bold rounded-full px-2  left-5 -top-5 bg-rose-400">{itemsInCart}</span>
                    </Link>
                </div>
      {
        productsList && (
          <div className=" grid gap-y-2 grid-cols-2 sm:grid-cols-3  animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)]">
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