'use client'

import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
import { CountdownTimer } from "nextjs-countdown-timer";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const Mensaje = () => {
  register();


  return (
    <div className=" w-[95%] mx-auto sm:w-[80%] lg:w-[65%]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
        <Image
        className=" mt-3 rounded-lg"
        src={"/imgs/PRECIOS_PACK.png"} 
        alt={""}
        width={1366}
        height={768}
        />
        </SwiperSlide>
        <SwiperSlide>
        <Image
        className=" rounded-lg"
        src={"/imgs/PROMO.png"} 
        alt={""}
        width={1366}
        height={768}
        />
        </SwiperSlide>
        <SwiperSlide>
          <Image
        className=" rounded-lg"
        src={"/imgs/BlusasTerra.png"} 
        alt={""}
        width={1366}
        height={768}
        />
        </SwiperSlide>
        
      </Swiper>
      <div>
			<h1>React Countdown Timer</h1>
			<CountdownTimer
          initialSeconds={60} 
          onTimerEnd={function (): void {
            throw new Error("Function not implemented.");
          } }				
			/>
		</div>
      </div>
  )
}




