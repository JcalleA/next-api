'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Attribute, Image as Img, Product, Variation } from "@/interfaces";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
import clsx from "clsx";
import { CartState, useStore } from "@/store";


interface Props {
    product: Product,
    variantes: Variation[]
}

export const SliderImg = ({ product, variantes }: Props) => {


    const [Variantes, setVariantes] = useState<Variation[]>(variantes.filter(element => element.attributes[1].option === 'Unica'))
    const [Talla, setTalla] = useState('Unica')
    const [color, setcolor] = useState(2)
    const cartLoad = CartState(state => state.CartLoad)
    const setCartLoad = CartState(state => state.setCartLoad)
    const setCartItems = CartState(state => state.setCartItems)
    const openMenu = useStore(state => state.openMenu)

    const variantesList = (name: string) => {
        const varianFiltered = variantes.filter(element => element.attributes[1].option === name)
        setVariantes(varianFiltered)
    }

    useEffect(() => {
        console.log(Variantes);

    }, [Variantes])

    const position = (num: number, dir: string) => {
        const numeros = Variantes.length
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

        if (itemsInLocal != null) {
            const itemsParsed = JSON.parse(itemsInLocal)
            itemsParsed.push()
            localStorage.setItem('products', JSON.stringify(itemsParsed))
            setCartItems(itemsParsed.length)
        }

        else {

            localStorage.setItem('products', JSON.stringify([]))
            setCartItems(1)
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
                                className=" relative "
                                key={Variantes.indexOf(elemen)}>
                                {
                                    elemen.stock_quantity === 0 && (
                                        <p className={
                                            clsx(" absolute  mx-auto my-auto inset-y-0 inset-x-0 text-center text-[60px] text-red-900 z-[2]",
                                                { " hidden":Variantes[color].stock_quantity !=0 }
                                            )
                                        }>Sin Stock</p>
                                    )
                                }
                                <Image
                                    className={
                                        clsx(" mx-auto w-[90%]  sm:w-[70%] mt-2 rounded-lg object-fill Image  ",
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
                        )

                        )}

                    <FaCircleArrowRight
                        className="  text-rose-300 w-7 h-7 absolute my-auto inset-y-0 right-0 z-10"
                        onClick={() => position(1, 'der')}
                    />
                </div>
                <div className=" flex w-[70%] mx-auto justify-center">
                    {
                        Variantes.map(element => (
                            <Image
                                key={Variantes.indexOf(element)}
                                className={
                                    clsx("  w-[10%] rounded-lg  object-cover ",
                                        { " opacity-100 w-[35%] border-2 border-rose-300 animate-pulse-fade-in": Variantes.indexOf(element) == color },
                                        { " opacity-40  ": Variantes.indexOf(element) != color },
                                        { " grayscale": element.stock_quantity === 0 }
                                    )
                                }
                                src={element.image.src}
                                alt={element.image.alt}
                                width={300}
                                height={300}
                                onMouseEnter={() => {
                                    setcolor(Variantes.indexOf(element))
                                }}
                            />
                        ))
                    }
                </div>
            </div>
            <h3>color: {Variantes[color!].name} {Talla}</h3>
            <div className=" my-2">
                <h4>Tallas Disponibles</h4>
                <div className=" flex">
                    {
                        product.attributes[1].options.map(size => (
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
            <div className=" flex align-middle my-auto">
                <button
                    className=" flex text-white align-middle my-auto p-2 bg-rose-300 border-2 mb-3 rounded-xl"
                    onClick={() => {
                        setItemLocal()
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
