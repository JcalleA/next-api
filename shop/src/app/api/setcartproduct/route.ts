import { type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { api } from "../getProducts";

export async function GET(request: NextRequest) {
  
  
  const id = request.nextUrl.searchParams.get("id");
  const variante = request.nextUrl.searchParams.get("variante");
  
  const data = await cookies().get("products");

  if (data?.value) {
    const cookiesCartList = await JSON.parse(data?.value);
    
      const elementVariations = await api.get(
        `products/${id}/variations`
      );
      elementVariations.data.forEach(async (element: {
        image: any;id: never; name: any 
}) => {
        if (element.name === variante) {
          

          cookiesCartList.push({
            id:element.id,
            name:element.name,
            img:element.image.src

          });
          
          cookies().set({
            name: "products",
            value: JSON.stringify(cookiesCartList),
            httpOnly: true,
            path: "/",
          });
          }
        })
        return Response.json({mensaje:'Producto Añadido A La Lista'});
      }else {
        
        const CartProducts:Object[]=[]
        const elementVariations = await api.get(
          `products/${id}/variations`
        );
        elementVariations.data.forEach((element: {
          image: any;id: never; name: any 
}) => {
          if (element.name === variante) {
            
              CartProducts.push({
                id:element.id,
                name:element.name,
                img:element.image.src
    
              });
              cookies().set({
                name: "products",
                value: JSON.stringify(CartProducts),
                httpOnly: true,
                path: "/",
              });
            }
          })
        
    return Response.json({ mensaje: "Nuevo Producto En El Carrito" });
}

}
