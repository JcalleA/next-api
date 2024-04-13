'use client';

import { useState } from "react";
import Image from "next/image";
import { Attribute, Image as Img } from "@/interfaces";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaCircleArrowRight,FaCircleArrowLeft  } from "react-icons/fa6";
import clsx from "clsx";
import { CartState, useStore } from "@/store";

interface Props {
    images: Img[];
    atributos: Attribute[],
    id: number,
}

export const SliderImg = ({ images, atributos, id }: Props) => {

    const [Talla, setTalla] = useState('Unica')
    const [color, setcolor] = useState(2)
    const imagenes=images.slice(1);
    const cartLoad = CartState(state => state.CartLoad)
    const setCartLoad = CartState(state => state.setCartLoad)
    const setCartItems = CartState(state => state.setCartItems)
    const openMenu=useStore(state=>state.openMenu)

    const position =(num:number,dir:string)=>{
        const numeros=imagenes.length
        console.log(color);
        if (numeros-1===color && dir==='der') {
            setcolor(0)
        } else if(color===0&&dir==='izq'){
            setcolor(numeros-1)
        }else{
            setcolor(color+num)
        }
    }
    
    const setItemLocal= async (id:number,variante:string)=>{
        
        const itemsInLocal=localStorage.getItem('products')
        if (itemsInLocal) {
            const itemsParsed=JSON.parse(itemsInLocal)
            await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/setcartproduct?id=${id}&Var=${variante}`)
            .then(res=>res.json())
            .then(res=>{
                
                itemsParsed.push(res)
                localStorage.setItem('products',JSON.stringify(itemsParsed))
                setCartItems(itemsParsed.length)
                
            })
        } else {
            await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/setcartproduct?id=${id}&Var=${variante}`)
            .then(res=>res.json())
            .then(res=>{
                localStorage.setItem('products',JSON.stringify([res]))
            })
        }
        
    }

    return (
        <div>
            <div>
                <div className="  relative ">
                    <FaCircleArrowLeft 
                    className=" text-rose-300 w-7 h-7 absolute my-auto inset-y-0"
                    onClick={()=>position(-1,'izq')}
                    />
                {
                    imagenes.map(img => (
                            <Image
                            key={imagenes.indexOf(img)}
                                className={
                                    clsx(" mx-auto w-[90%]  sm:w-[70%] mt-2 rounded-lg object-fill Image  ",
                                        { " hidden": imagenes.indexOf(img) != color },
                                        { " animate-blurred-fade-in": imagenes.indexOf(img) == color }
                                    )
                                }
                                src={img.src}
                                alt={img.alt}
                                width={300}
                                height={300}
                            />
                        ))}
                        <FaCircleArrowRight 
                        className="  text-rose-300 w-7 h-7 absolute my-auto inset-y-0 right-0"
                        onClick={()=>position(1,'der')}
                        />
                        </div>
                <div className=" flex w-[70%] mx-auto justify-center">
                    {
                        imagenes.map(img => (
                            <Image
                                key={imagenes.indexOf(img)}
                                className={
                                    clsx("  w-[10%] rounded-lg  object-cover ",
                                        { " opacity-100 w-[35%] border-2 border-rose-300 animate-pulse-fade-in": imagenes.indexOf(img) == color },
                                        { " opacity-40  ": imagenes.indexOf(img) != color }
                                    )
                                }
                                src={img.src}
                                alt={img.alt}
                                width={300}
                                height={300}
                                onMouseEnter={()=>{
                                    setcolor(imagenes.indexOf(img))}}
                            />
                        ))
                    }
                </div>
            </div>
            <h3>color: {imagenes[color!].name} {Talla}</h3>
            <div className=" my-2">
                <h4>Tallas Disponibles</h4>
                <div className=" flex">
                    {
                        atributos[1].options.map(size => (
                            <button
                                className={
                                    clsx(
                                        " rounded-full px-5 py-2 mx-4  border-2 ",
                                        {
                                            "bg-rose-300": Talla === size
                                        }
                                    )
                                }
                                key={size}
                                onClick={() => setTalla(size)}
                            >
                                {size}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className=" flex align-middle my-auto">
                <button
                    className=" flex text-white align-middle my-auto p-2 bg-rose-300 border-2 mb-3 rounded-xl"
                    onClick={() => {
                        setItemLocal(id,`${imagenes[color!].name}, ${Talla}`)
                        setCartLoad(true)
                        openMenu()
                    }}
                >Agregar Al Carrito
                    <MdOutlineAddShoppingCart
                        className=" w-8 h-8 text-white" />
                </button>
            </div>
        </div>
    )
}
