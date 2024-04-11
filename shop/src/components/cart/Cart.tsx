'use client';


import { Product } from "@/interfaces";
import { CartState } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";



interface Props {
    products: Product[]
}


export const Cart = () => {

    const [products, setCartProducts] = useState<Product[]>([])

    const stateCart = CartState(state => state.CartId)
    const itemsInCart = CartState(state => state.setCartItems)
    const [mensajeCart, setmensajeCart] = useState('Carrito Vacio')


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/getcartproducts`)
            .then((res) => res.json())
            .then((data) => {
                setCartProducts(data)
                itemsInCart(data.length)
                if (products[0]) {
                    setmensajeCart('')
                } else {
                    setmensajeCart('Carrito Vacio')
                }


            })
    }, [itemsInCart, products, stateCart])


    return (
        <div className="">

            {
                products && (
                    products.map((product:Product) => (
                        <div key={products.indexOf(product)} className=" flex ">
                            <Image
                                src={product.img}
                                width={65}
                                height={65}
                                alt={""} />
                                <IoIosCloseCircle 
                                className="  my-auto w-[10%]  h-full text-rose-300"
                                onClick={()=>fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/delcartproduct?id=${products.indexOf(product)}`)}
                                />
                        </div>
                    ))
                )
            }
            <h3 className=" text-center text-4xl mt-10 text-slate-50">{mensajeCart}</h3>
        </div>
    )
}
