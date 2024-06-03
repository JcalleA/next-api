"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product, Variation } from "@/interfaces";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
import clsx from "clsx";
import { CartState, useStore } from "@/store";
import Link from "next/link";
import "./slider.css";
import { Bebas } from "@/config/fonts";

interface Props {
  product: Product;
  variantes: Variation[];
}

const addToCartEvent = async () => {
  const { default: ReactPixel } = await import("react-facebook-pixel");
  ReactPixel.init(process.env.NEXT_PUBLIC_PIXELID!);
  ReactPixel.track("AddToCart", { currency: "COP", value: 25000 });
};

export const SliderImg = ({ product, variantes }: Props) => {
  const [Variantes, setVariantes] = useState<Variation[]>();
  const [Talla, setTalla] = useState("L");
  const [color, setcolor] = useState(0);
  const setCartLoad = CartState((state) => state.setCartLoad);
  const setCartItems = CartState((state) => state.setCartItems);
  const CartItems = CartState((state) => state.CartItems);
  const [touchStart, settouchStart] = useState(0);
  const [touchEnd, settouchEnd] = useState(0);
  const [popup, setpopup] = useState("hidden");
  const [mensajePopup, setmensajePopup] = useState("");
  const [Recorrido, setRecorrido] = useState('')

  const variantesList = (name: string) => {
    const varianFiltered = variantes.filter(
      (element) => element.attributes[1].option === name
    );
    setVariantes(varianFiltered);
  };
  useEffect(() => {
    setVariantes(
      variantes.filter(
        (element) =>
          element.attributes[1].option === element.attributes[1].option[0]
      )
    );
  }, [variantes]);

  const handlePopup = () => {
    if (CartItems + 1 < 3) {
      setmensajePopup(
        `Agrega ${3 - (CartItems + 1)} más para obtener envio gratis`
      );
      setpopup(" absolute -mt-20 bg-white opacity-75 rounded-md px-4 py-2 ");
      setTimeout(() => {
        setpopup("hidden");
      }, 2000);
    } else {
      setmensajePopup("");
    }
  };

  const position = (num: number, dir: string) => {
    const numeros = Variantes!.length;
    if (numeros - 1 === color && dir === "der") {
      setcolor(0);
      setRecorrido('translate-x-[0%]')
    } else if (color === 0 && dir === "izq") {
      setRecorrido(`translate-x-[-80%]`)
      setcolor(numeros - 1);
    } else {
      setcolor(color + num);
      if (color + num === 0) {
        setRecorrido(`translate-x-[0%]`)
      }else if (color + num === 1) {
        setRecorrido(`translate-x-[-20%]`)
      }else if (color + num === 2) {
        setRecorrido(`translate-x-[-40%]`)
      } else if (color + num === 3) {
        setRecorrido(`translate-x-[-60%]`)
      }else if (color + num === 4) {
        setRecorrido(`translate-x-[-80%]`)
      }

    }
  };

  const handleChangeImg = (posInitx: number, posEndx: number) => {
    if (posInitx - posEndx >= 25) {
      position(-1, "izq");
      settouchStart(posEndx);
    }
    if (posInitx - posEndx <= -25) {
      position(1, "der");

      settouchStart(posEndx);
    }
  };

  const setItemLocal = async () => {
    const itemsInLocal = localStorage.getItem("products");
    if (itemsInLocal != null && Variantes) {
      const itemsParsed = JSON.parse(itemsInLocal);
      let item = Variantes[color]
      item.product_Name = product.name
      itemsParsed.push(item);
      localStorage.setItem("products", JSON.stringify(itemsParsed));
      setCartItems(itemsParsed.length);
    } else {
      if (Variantes) {
        let item = Variantes[color]
        item.product_Name = product.name
        localStorage.setItem("products", JSON.stringify([item]));
        setCartItems(1);
      }
    }
  };

  const selectColor = (num: number) => {
    if (num === 0) {
      setRecorrido('translate-x-[0%]')
    } else if (num === 1) {
      setRecorrido('translate-x-[-20%]')
    } else if (num === 2) {
      setRecorrido('translate-x-[-40%]')
    } else if (num === 3) {
      setRecorrido('translate-x-[-60%]')
    } else if (num === 4) {
      setRecorrido('translate-x-[-80%]')
    }

  }


  return (
    <div className="">
      <div className=" h-screen">
        <div className=" h[60vh] mt-10 relative overflow-hidden">
          <FaCircleArrowLeft
            className=" text-rose-300 w-7 h-7 absolute my-auto inset-y-0 z-10 bg-black rounded-full "
            onClick={() => position(-1, "izq")}
          />
          {Variantes &&
            Variantes.map((elemen) => (
              <div className="" key={Variantes.indexOf(elemen)}>
                {elemen.stock_quantity === 0 && (
                  <p
                    className={clsx(
                      " absolute  mx-auto my-auto inset-y-0 inset-x-0 text-center text-[60px] text-red-900 z-[2]",
                      { " hidden": Variantes[color].stock_quantity != 0 }
                    )}
                  >
                    Sin Stock
                  </p>
                )}
              </div>
            ))}
          <div className="  mx-auto w-[86%] sm:w-[70%] rounded-xl overflow-hidden ">
            {Variantes &&
              <div className={` flex flex-row  relative w-[500%] ${Recorrido} transition-all duration-700 `}>
                <div className={` absolute top-0 w-[100%] h-[100%] z-0 bgGradient w-[${Variantes.length}00%] ${Recorrido} transition-all duration-[2500ms]  `} ></div>

                {Variantes.map((elemen) => (
                  <div className=" w-[100%] relative" key={elemen.id}>
                    <div className={
                      clsx(`${Bebas.className} flex absolute whitespace-nowrap translate-x-[-100%] text-center top-5 text-8xl transition-all`,
                        { " animate-transitionToLefft": Variantes.indexOf(elemen) == color },
                        { " hidden": Variantes.indexOf(elemen) != color },
                        { " text-white": Variantes.indexOf(elemen) == 3 }
                      )
                    } >
                      <h2>{product.name} {elemen.attributes[0].option}</h2>
                    </div>
                    
                    <div className=" z-20">
                      <Image
                        className={clsx(
                          " relative mx-auto w-[100%]  sm:w-[100%] rounded-lg object-fill Image z-20 Img_Shadow ",
                          {
                            " ":
                              Variantes.indexOf(elemen) == color,
                          },
                          { " grayscale": elemen.stock_quantity === 0 }
                        )}
                        src={elemen.image.src}
                        alt={elemen.image.alt}
                        width={300}
                        height={300}

                        onMouseDown={(e) => {
                          e.currentTarget.style.transform = "scale(1.5)";
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        onTouchStart={
                          (e) => {
                            e.preventDefault();
                            e.currentTarget.style.transform = "scale(1.5)";
                          }
                        }
                        onTouchEnd={
                          (e) => {
                            e.preventDefault();
                            e.currentTarget.style.transform = "scale(1)";
                          }
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
          <FaCircleArrowRight
            className="  text-rose-300 w-7 h-7 absolute my-auto inset-y-0 right-0 z-10 bg-black rounded-full"
            onClick={() => position(1, "der")}
          />
          <div className=" text-center">
            <div>
              <h2 className=" font-bold">{product.name}</h2>
            </div>
            <div>
              <span className=" text-yellow-400 font-bold text-xl ">★★★★★</span>
            </div>
            <div className=" flex justify-center mb-2">
              <div className=" text-center ">
                {Variantes && Variantes[color].regular_price && (
                  <span className=" rounded-full p-1 m-2 border-2 border-red-600 line-through text-red-600 font-bold text-xl ">
                    ${" "}
                    {new Intl.NumberFormat().format(
                      parseInt(Variantes![color].regular_price)
                    )}
                  </span>
                )}
              </div>
              <div className=" text-center ">
                {Variantes && Variantes[color].regular_price && (
                  <span className=" px-2 text-white rounded-full bg-green-700 border-2 border-black p-1 m-2 font-bold text-xl ">
                    ${" "}
                    {new Intl.NumberFormat().format(
                      parseInt(Variantes![color].sale_price)
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className=" h-[40vh]">

          <div className=" items-center text-center mt-1">
            <h4 className=" text-center text-xl font-semibold">
              Selecciona un Color
            </h4>
            {
              Variantes && Variantes![color!].name &&
              <span className=" text-sm m-0">{Variantes![color!].name}</span>
            }
          </div>

          <div
            className=" relative flex w-[100%] h-[25%] sm:w-[70%] mx-auto justify-center mt-1 overflow-hidden rounded-lg "
            onTouchStart={(e) => {
              settouchStart(e.touches[0].clientX);
            }}
            onTouchMove={(e) => {
              settouchEnd(e.touches[0].clientX);
              handleChangeImg(touchStart, touchEnd);
            }}
          >
            <div className=" w-[100%]  flex overflow-hidden ">
              {Variantes &&
                Variantes.map((element) => (
                  <Image
                    key={Variantes!.indexOf(element)}
                    className={clsx(
                      "  w-[18%]   object-cover z-10 ",
                      {
                        " opacity-100 w-[36%] border-2 border-rose-300 animate-pulse-fade-in":
                          Variantes.indexOf(element) == color,
                      },
                      { " opacity-40  ": Variantes!.indexOf(element) != color },
                      { " bg-gray-500  ": Variantes!.indexOf(element) != color },
                      { " grayscale": element.stock_quantity === 0 }
                    )}
                    src={element.image.src}
                    alt={element.image.alt}
                    width={300}
                    height={300}
                    onMouseEnter={() => {
                      setcolor(Variantes!.indexOf(element));
                      selectColor(Variantes!.indexOf(element));
                    }}
                  />
                ))}
              <div className={` absolute h-[100%] w-[500%] z-0 ${Recorrido} bgGradient transition-all duration-700 `}></div>
            </div>

          </div>
          <div className=" my-1 text-xl font-bold mt-1 text-center">
            <h4 className=" font-semibold">Selecciona una Talla</h4>
            <div className=" flex mt-1 w-full justify-center">
              {product.attributes[1].options.map((size) => (
                <button
                  className={clsx(
                    " rounded-full border-2 border-black shadow-lg shadow-black px-5 py-2 mx-4 ",
                    {
                      "bg-rose-300 hover:bg-rose-400": Talla === size,
                    }
                  )}
                  key={size}
                  onClick={() => {
                    variantesList(size);
                    setTalla(size);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="font-bold text-xl flex align-middle my-auto mt-1">
            {Variantes && (
              <div className=" w-full justify-center">
                <button
                  className={clsx(
                    " flex mx-auto text-black align-middle my-auto px-4 py-2 bg-gray-300 border-2 mb-3 rounded-full",
                    { " hidden": Variantes[color].stock_quantity != 0 }
                  )}
                >
                  Sin Stock
                  <MdOutlineAddShoppingCart className=" w-8 h-8 text-black" />
                </button>
                <div className={popup} onClick={() => setpopup("hidden")}>
                  <span>{mensajePopup}</span>
                </div>
                <button
                  className={clsx(
                    " flex mx-auto align-middle my-auto px-4 leading-5 py-2 mt-1 bg-rose-300 hover:bg-rose-400 border-2 border-black shadow-lg shadow-black mb-3 rounded-full",
                    { " hidden": Variantes[color].stock_quantity === 0 }
                  )}
                  onClick={() => {
                    addToCartEvent();
                    setItemLocal();
                    setCartLoad(true);
                    handlePopup();
                  }}
                >
                  <div>
                    <span>Agregar Al Carrito</span>
                    <br></br>
                    <span className=" text-sm">{Variantes![color!].name}</span>
                  </div>

                  <MdOutlineAddShoppingCart className=" w-8 h-8 text-black" />
                </button>
                <Link
                  className=" mx-auto w-fit rounded-full  p-1 flex justify-center border-2 border-rose-800 align-middle items-center mb-4  text-rose-800 underline"
                  href={"/?showmenu=true"}
                >
                  Ver Carrito
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
