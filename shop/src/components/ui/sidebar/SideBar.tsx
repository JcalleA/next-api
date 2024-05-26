'use client';

import { LiaWindowCloseSolid } from "react-icons/lia"
import clsx from "clsx";
import { Cart } from "@/components/cart/Cart";
import { Product } from "@/interfaces";
import { useRouter, useSearchParams } from 'next/navigation'




interface Props {
    products: Product[],
    
    
}

export const SideBar =  () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const isMenuOpen = searchParams.get('showmenu')
    const isModalOpen = searchParams.get('showmodal')
    
    
    return (
        <div>
            {
                (isMenuOpen || isModalOpen) && (
                    <div
                        onClick={() => {
                            
                            router.back()

                        }}
                    >
                        {/* Background black*/}
                        < div className=" fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
                        {/* Background bluur*/}
                        <div className=" fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-md"></div>


                    </div>
                )
            }

            {/* Side Cart*/}
            <div className={
                clsx(
                    'fixed p-5 right-0 top-0 w-[95%] sm:w-[500px]  h-screen bg-gradient-to-r from-teal-700 to-cyan-700 z-40 shadow-2xl transform transition-all duration-500',
                    {
                        "translate-x-full": !isMenuOpen
                    }
                )
            }>
                <LiaWindowCloseSolid
                    className=" absolute w-10 h-10 text-white right-0 cursor-pointer"
                    onClick={router.back}
                />
                        <Cart />
            </div>
            
        </div >
    )
}
