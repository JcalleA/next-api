import Link from "next/link";



export default function gracias() {
    return (
        <div className="container mx-auto py-8 text-center">
            <h1 className="text-3xl font-semibold mb-4">¡Gracias por tu compra!</h1>
            <p className="text-lg mb-4">Tu pedido ha sido procesado con éxito.</p>
            
            <p className="text-lg mb-4">Recibirás un Whatsapp de confirmación con los detalles de tu pedido.</p>
            <Link className="text-blue-600 underline" href={"/"}>Volver a la tienda</Link>
            
        </div>
    );
}