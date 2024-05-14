

import Image from "next/image";


export const Mensaje = () => {



  return (
    <div className=" relative w-full">
        <Image
        src={"/imgs/PROMO.png"} 
        alt={""}
        width={1366}
        height={768}
        />
        <div>
          <Image 
          src={"/imgs/EnvioPago.png"} 
          alt={""}
          width={1366}
          height={300}
          />
        </div>
    </div>
  )
}

