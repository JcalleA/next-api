'use client';

import { LiaWindowCloseSolid } from "react-icons/lia"
import {  useStore } from "@/store"
import clsx from "clsx";
import { Cart } from "@/components/cart/Cart";
import { Product } from "@/interfaces";




interface Props {
    products: Product[],
    
    
}


export const SideBar =  () => {

    
    const isMenuOpen = useStore(state => state.isMenuOpen)
    const isModalOpen = useStore(state => state.isModalOpen)
    const closeMenu = useStore(state => state.closeMenu)
    const closeModal = useStore(state => state.closeModal)
    

    return (
        <div>
            {
                (isMenuOpen || isModalOpen) && (
                    <div
                        onClick={() => {
                            closeModal()
                            closeMenu()

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
                    'fixed p-5 right-0 top-0 w-[356px] sm:w-[500px]  h-screen bg-slate-500 z-20 shadow-2xl transform transition-all duration-300',
                    {
                        "translate-x-full": !isMenuOpen
                    }
                )
            }>
                <LiaWindowCloseSolid
                    className=" absolute w-10 h-10 text-white right-0 cursor-pointer"
                    onClick={() => closeMenu()}
                />
                
                        <Cart />
                    
                

            </div>

        </div >

    )
}
