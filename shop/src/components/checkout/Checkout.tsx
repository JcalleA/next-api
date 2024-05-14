'use client';

import { Variation } from "@/interfaces";
import { CartState, useStore } from "@/store";
import { ChangeEvent, useEffect, useState } from "react";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { Colombia } from "@/seed/seed";
import { useForm } from "react-hook-form"
import { Logo1Font, Logo2Font, titleFont } from "@/config/fonts"
import Image from "next/image"
import { MdOutlineFactCheck } from "react-icons/md";
import clsx from "clsx";
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from "theme-ui";



const PurchaseEvent = async (valor:number) => {
    const { default: ReactPixel } = await import("react-facebook-pixel");
    ReactPixel.init(process.env.NEXT_PUBLIC_PIXELID!);
    ReactPixel.track("Purchase", {currency: "COP", value: valor});
    }


export const Checkout = () => {

    const { handleSubmit, formState: { errors } } = useForm()
    const router = useRouter();
    const searchParams = useSearchParams()
    const [datos, setdatos] = useState<Variation[]>()
    const itemsinCart = CartState(state => state.CartItems)
    const setCartItems = CartState(state => state.setCartItems)
    const checkoutIsOpen = searchParams.get('showcheck')
    const listaPais = Colombia
    const [Departamento, setDepartamento] = useState('')
    const [Ciudad, setCiudad] = useState('')
    const [Ciudades, setCiudades] = useState([''])
    const [TotalPedido, setTotalPedido] = useState(0)
    const [DescuentoUnitario, setDescuentoUnitario] = useState(0)
    const [Descuento, setDescuento] = useState(0)
    const [Envio, setEnvio] = useState(0)
    const [LoadCheckout, setLoadCheckout] = useState(false)
    const [formData, setformData] = useState(
        {
            payment_method: "cod",
            payment_method_title: "Contra Entrega",
            status: 'processing',
            set_paid: false,
            currency: 'COP',
            billing: {
                first_name: "",
                last_name: "",
                address_1: "",
                address_2: "",
                city: "",
                state: "",
                country: "CO",
                email: "",
                phone: ""
            },
            shipping: {
                first_name: '',
                last_name: '',
                address_1: '',
                address_2: '',
                city: "",
                state: "",
                country: "CO",
                email: "",
                phone: ""
            },

            shipping_lines: [{
                method_id: "",
                total: ""
            }],
            coupon_lines: [{
                code: '',
            }],
            line_items: [{}],
        }
    )

    useEffect(() => {
        const products = localStorage.getItem('products')
        if (products) {
            const listaParsed = JSON.parse(products)
            setdatos(listaParsed)
            let sumaProducts = 0
            for (let index = 0; index < listaParsed.length; index++) {
                const element = listaParsed[index];
                sumaProducts += parseInt(element.regular_price)
            }
            if (listaParsed.length != 0) {
                setDescuentoUnitario(listaParsed[0].regular_price - listaParsed[0].sale_price)
            }
            setTotalPedido(sumaProducts)
            const total = listaParsed.length
            if (total < 3) {
                setDescuento(total * DescuentoUnitario)
                setEnvio(13000)
                setformData({
                    ...formData,
                    shipping_lines: [{
                        method_id: "flat_rate",
                        total: "13000"
                    }],
                    coupon_lines: [{
                        code: '0',
                    }],
                })
            }
            if (total >= 3 && total < 6) {
                setDescuento(total * 3000 + (total * DescuentoUnitario))
                setEnvio(0)
                setformData({
                    ...formData,
                    shipping_lines: [{
                        method_id: "free_shipping",
                        total: "0"
                    }],
                    coupon_lines: [{
                        code: '3+',
                    }],
                })
            }
            if (total >= 6 && total < 12) {
                setDescuento(total * 6000 + (total * DescuentoUnitario))
                setEnvio(0)
                setformData({
                    ...formData,
                    shipping_lines: [{
                        method_id: "free_shipping",
                        total: "0"
                    }],
                    coupon_lines: [{
                        code: '6+',
                    }],
                })
            }
            if (total >= 12) {
                setDescuento(total * 10000 + (total * DescuentoUnitario))
                setEnvio(0)
                setformData({
                    ...formData,
                    shipping_lines: [{
                        method_id: "free_shipping",
                        total: "0"
                    }],
                    coupon_lines: [{
                        code: '12+',
                    }],
                })
            }
            if (total === 0) {
                setDescuento(0)
                setEnvio(0)
                setformData({
                    ...formData,
                    coupon_lines: [{
                        code: '0',
                    }],
                })
            }
        }
        else {
            setDescuento(0)
            setEnvio(0)
        }
        

    }, [itemsinCart])

    useEffect(() => {
        if (Departamento && Departamento != 'Seleccionar Departamento') {
            const { ciudades } = listaPais.filter((depart) => depart.departamento === Departamento)[0]
            setCiudades(ciudades)
        }
        else {
            setCiudades([''])
        }
    }, [Departamento])

    
    const handleBillingInput = (e: ChangeEvent<HTMLInputElement>) => {
        setformData({
            ...formData,
            billing: {
                ...formData.billing,
                [e.target.name]: e.target.value,
            },
            shipping: {
                ...formData.shipping,
                [e.target.name]: e.target.value,
            }
        })

    }

    useEffect(() => {
        if (datos) {
            const itensCart = []
            for (let index = 0; index < datos.length; index++) {
                const product = {
                    product_id: datos[index].parent_id,
                    variation_id: datos[index].id,
                    quantity: 1
                }
                itensCart.push(product)
            }
            setformData({
                ...formData,
                line_items: itensCart
            })
            
        }
    }, [datos])

    useEffect(() => {
        setformData({
            ...formData,
            billing: {
                ...formData.billing,
                state: Departamento,
            },
            shipping: {
                ...formData.shipping,
                state: Departamento,
            }
        })
    }, [Departamento])

    useEffect(() => {
        setformData({
            ...formData,
            billing: {
                ...formData.billing,
                city: Ciudad,
            },
            shipping: {
                ...formData.shipping,
                city: Ciudad,
            }
        })
    }, [Ciudad])

    const submit = () => {

        setLoadCheckout(true)
        fetch('http://localhost:4000/products/createorder', {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((res)=>{
            if (res.status===200) {
                
                PurchaseEvent(TotalPedido - Descuento + Envio)
                setLoadCheckout(false)
                localStorage.setItem('products', JSON.stringify([]))
                setCartItems(0)
                alert('Pedido Realizado Con Exito Por Favor Revisa Tu Whatsapp Donde Compartiremos Informacion De tu Envio.')
                router.push('/gracias')
            }
            if (res.status===400) {
                setLoadCheckout(false)
                alert('Error En Tu Pedido, Revisa De Nuevo Los Campos O productos.')
            }
            if (res.status===500) {
                setLoadCheckout(false)
                alert('Error Del Servidor Intenta De Nuevo En Unos Minutos.')
            }
        }
        )
    }

    return (
        datos && (
            <div className={
                clsx(" overflow-auto no-scrollbar fixed top-0 w-[100%] mx-auto  h-screen  bg-gradient-to-r from-teal-400 to-cyan-400 z-50",
                    {
                        ' translate-x-[3000px] ': !checkoutIsOpen
                    })}>
                <LiaWindowCloseSolid
                    className=" absolute w-10 h-10 text-white right-0 cursor-pointer"
                    onClick={router.back}
                />
                <div className={
                clsx("  fixed flex top-0 left-0 text-center items-center align-middle justify-center w-[100%]   h-full sm:w-[100%] bg-gradient-to-r from-teal-400 to-cyan-400 opacity-60 z-50",
                    {
                        ' hidden ': !LoadCheckout
                    })}>
                        <Spinner  style={{ color: '#f7cbf7' }} />
                    </div>
                <div className=" flex align-middle justify-around bg-gradient-to-r from-teal-400 to-cyan-400 shadow shadow-black">
                    <Image className="hover:scale-110" width={"80"} height={"80"} src={'/imgs/Logo1.png'} alt={""}></Image>
                    <div className=" align-middle w-1/2">
                        <span className={`${Logo2Font.className} antialiased font-bold text-3xl `}>BIM</span>
                        <span className="text-4xl"> | </span>
                        <span className={`${Logo1Font.className} antialiased font-bold text-3xl `}>YOU</span>
                    </div>
                </div>
                <div className=" w-full items-center   text-center text-sm sm:text-lg font-semibold">
                    <table className=" w-[75%] mx-auto mt-2 table-auto">
                        <thead className="border-2 border-separate border-spacing-2">
                            <tr className="">
                                <th className="border-2">Unidad</th>
                                <th className="border-2">Valor</th>
                                <th className="border-2">Descuento</th>
                                <th className="border-2">Envio</th>
                                <th className="border-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-2 text-sm bg-green-300 font-semibold   sm:text-xl sm:font-extrabold ">{datos!.length}</td>
                                <td className="border-2 text-sm bg-green-300 font-semibold   sm:text-xl sm:font-extrabold ">${new Intl.NumberFormat().format(TotalPedido)}</td>
                                <td className="border-2 text-sm bg-green-300 font-semibold   sm:text-xl sm:font-extrabold  text-red-600">{
                                    Descuento === 0 && (
                                        <span>0</span>
                                    )
                                }
                                    {
                                        Descuento != undefined && (
                                            <span>
                                                $-{new Intl.NumberFormat().format(Descuento)}
                                            </span>
                                        )
                                    }</td>
                                {
                                    Envio === 0 &&
                                    <td className="border-2 text-sm bg-green-300 font-semibold   sm:text-xl sm:font-extrabold ">Grtais</td>
                                }
                                {
                                    Envio != 0 &&
                                    <td className="border-2">{Envio}</td>
                                }
                                <td className="border-2 text-sm bg-green-600 font-semibold   sm:text-xl sm:font-extrabold ">${new Intl.NumberFormat().format(TotalPedido - Descuento + Envio)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className=" flex text-ml mt-2 w-[100%] text-center mx-auto text-lg font-bold justify-center">
                    <h3>Metodo de pago:</h3>
                    <h3 className=" ml-2 ">Contra entrega, paga al recibir</h3>
                </div>
                <form className=" h-[90%]" onSubmit={handleSubmit(submit)}>
                    <div className=" m-3 mt-5 w-full text-center">
                        <label htmlFor="first_name"></label>
                        <input required className=" h-auto w-[70%] text-center rounded-md p-2" placeholder="Nombres" type="text" name="first_name" onChange={handleBillingInput} />
                    </div >
                    <div className=" m-3 mt-5 w-full text-center">
                        <label htmlFor="last_name"></label>
                        <input required className=" h-auto w-[70%] text-center rounded-md p-2" placeholder="Apellidos" type="text" name="last_name" onChange={handleBillingInput} />
                    </div>
                    <div className=" m-3 mt-5 w-full text-center">
                        <label htmlFor="state"></label>
                        <select
                            required
                            className=" h-auto w-[70%] text-center rounded-md p-2"
                            value={Departamento}
                            onChange={(event) => setDepartamento(event.target.value)}>
                            <option value="" disabled>Seleccionar Departamento</option>
                            {listaPais.map((e, index) =>
                                <option key={index} value={e.departamento}>{e.departamento}</option>
                            )}
                        </select>
                    </div>

                    {
                        Ciudades && (
                            <div className=" m-3 mt-5 w-full text-center">
                                <label htmlFor="city"></label>
                                <select
                                    required
                                    className=" h-auto w-[70%] text-center rounded-md p-2"
                                    value={Ciudad}
                                    onChange={(event) => setCiudad(event.target.value)}>
                                    <option value="" disabled>Seleccionar Ciudad</option>
                                    {Ciudades.map((e, index) => <option key={index} value={e}>{e}</option>
                                    )}
                                </select>

                            </div>

                        )
                    }
                    <div className=" m-3 mt-5 w-full text-center">
                        <label htmlFor="address_1"></label>
                        <input
                            className=" h-auto w-[70%] text-center rounded-md p-2"
                            required
                            type="text"
                            placeholder="Carrera... #.."
                            name="address_1"
                            onChange={handleBillingInput} />
                    </div>
                    <div className=" m-3 mt-5 w-full text-center">
                        <label htmlFor="address_2"></label>
                        <input
                            className=" h-auto w-[70%] text-center rounded-md p-2"
                            required
                            placeholder="Barrio"
                            type="text" name="address_2"
                            onChange={handleBillingInput} />
                    </div>
                    <div className=" m-3 mt-5 w-full text-center">
                        <label htmlFor="phone"></label>
                        <input
                            className=" h-auto w-[70%] text-center rounded-md p-2"
                            required
                            placeholder="Celular"
                            type="tel" name="phone"
                            pattern="[0-9]{10}"
                            onChange={handleBillingInput} />
                    </div>
                    <div className=" m-3 mt-5 w-full text-center">
                        <label htmlFor="email"></label>
                        <input
                            className=" h-auto w-[70%] text-center rounded-md p-2"
                            required
                            placeholder="Correo"
                            type="email" name="email"
                            pattern="[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-])+@[a-zA-Z0-9]([^@&%$\/\(\)=?¿!\.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?"
                            onChange={handleBillingInput} />
                    </div>
                    <div className=" text-wrap  m-3 mt-5 w-full px-4 text-center items-center">
                        <input
                            className="  h-auto  text-center rounded-md p-2"
                            name="Check"
                            value="Check"
                            type="checkbox"
                            required
                        />
                        <label htmlFor="Check">Confirmo que estoy dispuesto a recibir el producto y pagar el valor cuando este sea entregado.</label>
                    </div>
                    <div className=" align-middle">
                        <button
                            type="submit"

                            className=" flex justify-center font-extrabold text-xl mx-auto items-center px-2 py-3 bg-rose-300 hover:bg-rose-400 border-2 rounded-full"
                        >Finalizar Compra
                            <MdOutlineFactCheck
                                className=" w-7 h-7 text-black ml-2" />

                        </button>
                    </div>


                </form>
            </div>
        )


    )
}
