import { type NextRequest } from "next/server";
import { cookies } from "next/headers";


export async function GET(request: NextRequest) {

  const id = request.nextUrl.searchParams.get("id");
  
  const data = await cookies().get("products");

  if (data?.value) {
    const cookiesCartList = await JSON.parse(data?.value);

    cookiesCartList.splice(id,1)
    cookies().set({
        name: "products",
        value: JSON.stringify(cookiesCartList),
        httpOnly: true,
        path: "/",
      });
    return Response.json({ mensaje: "Producto Eliminado De La Lista" });
  } else {

    
    return Response.json({ mensaje: "Carrito Vacio" });
  }
}
