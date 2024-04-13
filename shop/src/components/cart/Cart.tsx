'use client';


import { Variation } from "@/interfaces";
import { CartState } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { Spinner } from 'theme-ui'

interface Props {
    products: Variation[]
}

export const Cart = () => {

    const [mensajeCart, setmensajeCart] = useState('Carrito Vacio')
    const [Data, setData] = useState<Variation[]>()
    const itemsinCart=CartState(state=>state.CartItems)
    const setCartItems = CartState(state => state.setCartItems)
    const cartLoad = CartState(state => state.CartLoad)
    const setCartLoad = CartState(state => state.setCartLoad)

    useEffect(() => {
        const produts = localStorage.getItem('products')!
        const listaParsed=JSON.parse(produts)
        setCartItems(listaParsed.length)
    }, [])

    useEffect(() => {
        const produts = localStorage.getItem('products')!
        const listaParsed=JSON.parse(produts)
        setData(listaParsed)
    }, [itemsinCart])
    
    useEffect(() => {
        
        if (Data?.length!=0) {
            setmensajeCart('')
            setCartLoad(false)
            if (Data?.length!=undefined) {
                setCartItems(Data.length)
            }
            
        } else {
            setmensajeCart('Carrito Vacio---')
            setCartLoad(false)
            
        }
    }, [Data])

    const delCartItem = (id: number) => {
        const produts = localStorage.getItem('products')!
        const listaParsed=JSON.parse(produts)
        listaParsed.splice(id, 1)
        localStorage.setItem('products', JSON.stringify(listaParsed))
        setData(listaParsed)
        setCartItems(listaParsed.length)
    }


    return (
        <div className="">
            {
                Data && (
                    Data.map((product: Variation) => (
                        <div key={Data.indexOf(product)} className=" flex ">
                            <Image
                                src={product.image.src}
                                width={65}
                                height={65}
                                alt={""} />
                                <h4>{product.name}</h4>
                            <IoIosCloseCircle
                                className="  my-auto w-[10%]  h-full text-rose-300"
                                onClick={() => {
                                    setCartLoad(true)
                                    delCartItem(Data.indexOf(product))}}
                            />
                        </div>
                    ))
                )
            }
            <div className="flex gap-4">
                {
                    cartLoad && (
                        <Spinner style={{color:'#f7cbf7'}}/>
                    )
                }

            </div>
            <h3 className=" text-center text-4xl mt-10 text-slate-50">{mensajeCart}</h3>
        </div>
    )
}
