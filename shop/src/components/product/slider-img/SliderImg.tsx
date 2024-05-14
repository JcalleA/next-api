'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product, Variation } from "@/interfaces";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
import clsx from "clsx";
import { CartState, useStore } from "@/store";
import Link from "next/link";



interface Props {
    product: Product,
    variantes: Variation[]
}

const addToCartEvent = async () => {
    const { default: ReactPixel } = await import("react-facebook-pixel");
    ReactPixel.init(process.env.NEXT_PUBLIC_PIXELID!);
    ReactPixel.track("AddToCart", {currency: "COP", value: 25000});
    }

export const SliderImg = ({ product, variantes }: Props) => {


    const [Variantes, setVariantes] = useState<Variation[]>()
    const [Talla, setTalla] = useState('L')
    const [color, setcolor] = useState(2)
    const setCartLoad = CartState(state => state.setCartLoad)
    const setCartItems = CartState(state => state.setCartItems)
    

    const variantesList = (name: string) => {
        const varianFiltered = variantes.filter(element => element.attributes[1].option === name)
        setVariantes(varianFiltered)
    }

    useEffect(() => {
        setVariantes(variantes.filter(element => element.attributes[1].option === element.attributes[1].option[0]))
    }, [variantes])

    const position = (num: number, dir: string) => {
        const numeros = Variantes!.length
        if (numeros - 1 === color && dir === 'der') {
            setcolor(0)
        } else if (color === 0 && dir === 'izq') {
            setcolor(numeros - 1)
        } else {
            setcolor(color + num)
        }
    }

    const setItemLocal = async () => {
        const itemsInLocal = localStorage.getItem('products')
        if (itemsInLocal != null && Variantes) {
            const itemsParsed = JSON.parse(itemsInLocal)
            itemsParsed.push(Variantes[color])
            localStorage.setItem('products', JSON.stringify(itemsParsed))
            setCartItems(itemsParsed.length)
        }
        else {
            if (Variantes) {
                localStorage.setItem('products', JSON.stringify([Variantes[color]]))
                setCartItems(1)
            }
        }
    }


    return (
        <div>
            <div>
            
                <div className="  relative ">
                    <FaCircleArrowLeft
                        className=" text-rose-300 w-7 h-7 absolute my-auto inset-y-0 z-10"
                        onClick={() => position(-1, 'izq')}
                    />
                    {
                        Variantes &&
                        Variantes.map(elemen => (
                            <div
                                className=" relative mt-3 "
                                key={Variantes.indexOf(elemen)}>
                                {
                                    elemen.stock_quantity === 0 && (
                                        <p className={
                                            clsx(" absolute  mx-auto my-auto inset-y-0 inset-x-0 text-center text-[60px] text-red-900 z-[2]",
                                                { " hidden": Variantes[color].stock_quantity != 0 }
                                            )
                                        }>Sin Stock</p>
                                    )
                                }
                                <div className=" overflow-hidden relative mx-auto w-[90%] sm:w-[70%] object-fill">
                                    <span
                                        className={
                                            clsx(" bg-red-600 h-20 w-40 content-end text-center box absolute top-[-20px] left-[-50px] transform -rotate-45 text-xl font-extrabold ",
                                                { " hidden": Variantes.indexOf(elemen) != color },
                                                { " animate-blurred-fade-in": Variantes.indexOf(elemen) == color },
                                                { " grayscale": elemen.stock_quantity === 0 }
                                            )
                                        }
                                    >Oferta</span>
                                    <Image
                                        className={
                                            clsx(" mx-auto w-[100%]  sm:w-[100%] rounded-lg object-fill Image  ",
                                                { " hidden": Variantes.indexOf(elemen) != color },
                                                { " animate-blurred-fade-in": Variantes.indexOf(elemen) == color },
                                                { " grayscale": elemen.stock_quantity === 0 }
                                            )
                                        }
                                        src={elemen.image.src}
                                        alt={elemen.image.alt}
                                        width={300}
                                        height={300}
                                    />
                                </div>
                            </div>
                        )
                        )}
                    <FaCircleArrowRight
                        className="  text-rose-300 w-7 h-7 absolute my-auto inset-y-0 right-0 z-10"
                        onClick={() => position(1, 'der')}
                    />
                </div>
                <div className=" text-center m-1">
                    <div>
                        <span className=" text-yellow-400 font-bold text-xl ">★★★★★</span>
                    </div>
                    <div className=" text-center m-2">
                        {
                            Variantes && Variantes[color].regular_price &&
                            <span className=" rounded-full p-1 m-2 border-2 border-red-600 line-through text-red-600 font-bold text-xl ">$ {new Intl.NumberFormat().format(parseInt(Variantes![color].regular_price))}</span>
                        }
                    </div>
                    <div className=" text-center m-2">
                        {
                            Variantes && Variantes[color].regular_price &&
                            <span className=" px-2 text-white rounded-full bg-green-700 p-1 m-2 font-bold text-xl ">$ {new Intl.NumberFormat().format(parseInt(Variantes![color].sale_price))}</span>
                        }
                    </div>
                </div>
                <div className=" flex w-[70%] mx-auto justify-center mt-2">
                    {Variantes &&
                        Variantes.map(element => (
                            <Image
                                key={Variantes!.indexOf(element)}
                                className={
                                    clsx("  w-[10%] rounded-lg  object-cover ",
                                        { " opacity-100 w-[35%] border-2 border-rose-300 animate-pulse-fade-in": Variantes.indexOf(element) == color },
                                        { " opacity-40  ": Variantes!.indexOf(element) != color },
                                        { " grayscale": element.stock_quantity === 0 }
                                    )
                                }
                                src={element.image.src}
                                alt={element.image.alt}
                                width={300}
                                height={300}
                                onMouseEnter={() => {
                                    setcolor(Variantes!.indexOf(element))
                                }}
                            />
                        ))
                    }
                </div>
            </div>
            {
                Variantes && (
                    <h3
                        className=" text-xl font-bold mt-3 text-center"
                    >color/talla:
                        <span className="  border-2 border-white rounded-full px-3 py-1 ml-1">
                            {Variantes![color!].name}
                        </span>
                    </h3>
                )
            }
            <div className=" my-2 text-xl font-bold mt-3 text-center">
                <h4>Tallas Disponibles</h4>
                <div className=" flex mt-3 w-full justify-center">
                    {
                        product.attributes[1].options.map(size => (
                            <button
                                className={
                                    clsx(
                                        " rounded-full px-5 py-2 mx-4  border-2 ",
                                        {
                                            "bg-rose-300 hover:bg-rose-400": Talla === size
                                        }
                                    )
                                }
                                key={size}
                                onClick={() => {
                                    variantesList(size)
                                    setTalla(size)
                                }}
                            >
                                {size}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className="font-bold text-xl flex align-middle my-auto mt-3">
                {
                    Variantes && (
                        <div className=" w-full justify-center">
                            <button
                                className={
                                    clsx(" flex mx-auto text-black align-middle my-auto px-4 py-2 bg-gray-300 border-2 mb-3 rounded-full",
                                        { " hidden": Variantes[color].stock_quantity != 0 }
                                    )
                                }
                            >Sin Stock
                                <MdOutlineAddShoppingCart
                                    className=" w-8 h-8 text-black" />
                            </button>
                            
                            <button
                                className={
                                    clsx(" flex mx-auto align-middle my-auto px-4 py-2 bg-rose-300 hover:bg-rose-400 border-2 mb-3 rounded-full",
                                        { " hidden": Variantes[color].stock_quantity === 0 }
                                    )
                                }
                                onClick={() => {
                                    addToCartEvent()
                                    setItemLocal()
                                    setCartLoad(true)
                                }}
                                
                            >Agregar Al Carrito
                                <MdOutlineAddShoppingCart
                                    className=" w-8 h-8 text-black" />
                            </button>
                            <Link className= " flex justify-center align-middle items-center mb-4 text-blue-600 underline" href={"/?showmenu=true"}>Ver Carrito</Link>
                            
                            
                        </div>
                    )
                }
            </div>
        </div>
    )
}
