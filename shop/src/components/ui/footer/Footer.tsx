

export const Footer = () => {
    const year=new Date();
  return (
    <div>
        <section className=" py-4">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Envíos a toda Colombia</h2>
            <p className="text-lg text-gray-600 mt-4">Recibe tus productos en cualquier parte del país con nuestros servicios de envío confiables.</p>
            <div className="mt-8 flex justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg" alt="Bandera de Colombia" className="w-32 h-auto"/>
            </div>
        </div>
    </section>
    <section className=" py-4">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Pago Contra Entrega</h2>
        <p className="text-lg text-gray-600 mt-4">
          Ahora puedes pagar tus compras al recibir tu pedido, sin complicaciones.
        </p>
        <div className="mt-8 flex justify-center">
          <img
            src="https://img.freepik.com/foto-gratis/hermosa-mujer-firma-paquete_23-2147787845.jpg"
            alt="Pago Contra Entrega"
            className="w-80 h-auto rounded-xl"
          />
        </div>
      </div>
    </section>
    <section className=" py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Características de Nuestras Camisetas</h2>
        <p className="text-lg text-gray-600 mt-4">
          Descubre las cualidades únicas de nuestras prendas.
        </p>
        <div className="mt-8 flex justify-center">
          <img
            src="https://img.freepik.com/fotos-premium/textura-ondas-tela-tela-seda-roja_133187-1576.jpg"
            alt="Blusa Tela Piel de Durazno"
            className="w-70 h-auto rounded-xl"
          />
        </div>
        <ul className="mt-8 text-left max-w-2xl mx-auto">
          <li className="text-lg text-gray-600 mt-2">
            <strong>Suavidad:</strong> La tela piel de durazno es extremadamente suave al tacto, proporcionando una sensación cómoda y agradable.
          </li>
          <li className="text-lg text-gray-600 mt-2">
            <strong>Durabilidad:</strong> Nuestras blusas están diseñadas para resistir el uso diario y mantener su forma y textura con el tiempo.
          </li>
          <li className="text-lg text-gray-600 mt-2">
            <strong>Transpirabilidad:</strong> La tela permite una excelente circulación del aire, manteniéndote fresca durante todo el día.
          </li>
          
          <li className="text-lg text-gray-600 mt-2">
            <strong>Estilo:</strong> Diseños modernos y elegantes que se adaptan a tu estilo personal.
          </li>
        </ul>
      </div>
    </section>
    <div className=" w-screen bg-black text-white text-xl py-6 text-center">
        <p>&copy; {year.getFullYear()} BIM YOU. Todos los derechos reservados.</p>

    </div>

    </div>
  )
}
