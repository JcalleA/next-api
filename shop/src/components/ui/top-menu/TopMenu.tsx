'use client';

import { Logo1Font, Logo2Font, titleFont } from "@/config/fonts"
import Link from "next/link"
import Image from "next/image"
import { GiShoppingCart } from "react-icons/gi";
import { CartState, useStore } from "@/store";

export const TopMenu = () => {

    const openMenu = useStore(state => state.openMenu)
    const itemsInCart = CartState(state => state.CartItems)
    return (
        <nav className=" justify-center bg-gradient-to-r from-teal-400 to-cyan-400">
            <div className=" flex w-full sm:w-[70%] sm:mx-auto items-center  justify-between " >
                <div className="  ">
                    <Link className=" items-center p-1 ml-10 " href="/">
                        <Image className="hover:scale-110" width={"80"} height={"80"} src={'/imgs/Logo1.png'} alt={""}></Image>

                    </Link>
                </div>
                <div>
                    <Link className=" items-center p-1 ml-10 transition-all hover:text-6xl hover:text-amber-700" href="/">
                        <span className={`${Logo2Font.className} antialiased font-bold text-3xl `}>BIM</span>
                        <span className="text-4xl"> | </span>
                        <span className={`${Logo1Font.className} antialiased font-bold text-3xl`}>YOU</span>
                    </Link>

                </div>

                <div className="relative pr-3">
                    <Link className="flex items-center m-2 mr-3  transition-all hover:scale-150  " 
                    href=""
                    onClick={()=>openMenu()}
                    >
                        <span className={`${titleFont.className} antialiased font-bold text-lg`}>Carrito</span>
                        <GiShoppingCart className=" w-6 h-6 ml-1 cursor-pointer" 
                        
                        />
                        <span className="absolute rounded-full px-1 right-4 -top-2 bg-orange-600">{itemsInCart}</span>
                    </Link>


                </div>
            </div>
        </nav>
    )
}

