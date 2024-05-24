"use client";


import { useEffect, useState } from "react";

export const Countdown = () => {
  const finalHour = new Date();

  const [Time, setTime] = useState({
    hour: 0,
    min: 0,
    sec: 0,
  });
  
  const handle_time = () => {
    setTimeout(() => {
      const date = new Date();
      setTime({
        hour: date.getHours(),
        min: date.getMinutes(),
        sec: date.getSeconds(),
      });
      handle_time();
    }, 1000);
  };

  useEffect(() => {
    handle_time();
  }, []);

  return (
    <div className=" text-xl font-semibold ">
        <div className=" text-center"> <h2> La oferta de Pack termina en:</h2></div>
    <div className=" flex w-[90%] mx-auto sm:w-[50%] justify-between">
      <div className=" text-center animate-zoom-out p-2 bg-red-400 border-2 border-black shadow-md shadow-black rounded-md" >
        <span>Horas:</span>
        <br></br>
        <span className=" font-extrabold text-2xl">{24 - Time.hour}</span>
      </div>
      <div className=" text-center animate-zoom-out p-2 bg-red-400 border-2 border-black shadow-md shadow-black rounded-md">
        <span>Minutos:</span>
        <br></br>
        <span className=" font-extrabold text-2xl">{59 - Time.min}</span>
      </div>
      <div className=" text-center animate-zoom-out p-2 bg-red-400 border-2 border-black shadow-md shadow-black rounded-md">
        <span>Segundos:</span>
        <br></br>
        <span className=" font-extrabold text-2xl">
          {59 - Time.sec}
        </span>
      </div>
    </div>
    </div>
  );
};
