

import Image from "next/image";


export const Mensaje = () => {



  return (
    <div className=" relative w-[95%] mx-auto mt-1 sm:w-[80%]">
        <Image
        className=" rounded-lg"
        src={"/imgs/PROMO.png"} 
        alt={""}
        width={1366}
        height={768}
        />
        <div>
          <Image
          className=" rounded-lg"
          src={"/imgs/EnvioPago.png"} 
          alt={""}
          width={1366}
          height={300}
          />
        </div>
    </div>
  )
}

