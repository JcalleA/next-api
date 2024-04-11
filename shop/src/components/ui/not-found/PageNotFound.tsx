import { Logo1Font,Logo2Font, titleFont } from "@/config/fonts"
import Link from "next/link"
import Image from "next/image"
import { GiShoppingCart } from "react-icons/gi";

export const PageNotFound = () => {
    return (
        <div className=" flex  h-[800px] w-full justify-center items-center align-middle">
            <div className=" text-center px-5">
                <h2 className=" text-lg text-black text-9xl">404</h2>
                <span>Pagina no encontrada</span>
                <div >
                <Link href="/">
                    <button className=" rounded-3xl p-3 hover:bg-slate-500 bg-slate-700 text-white">Regresar Al Inicio
                    </button>
                </Link>
                </div>
                
            </div>


        </div>
    )
}

