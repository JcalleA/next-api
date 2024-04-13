import { type NextRequest } from "next/server";
import { api } from "../getProducts";
import { Variation } from "@/interfaces";


export async function GET(request: NextRequest) {

  const id = request.nextUrl.searchParams.get("id");
  const Var = request.nextUrl.searchParams.get("Var");
  console.log(id);
  
  
  const datos = await api.get(`products/${id}/variations`)
  const product= datos.data.filter((e: { name: string ; })=>e.name===Var)
  const data={
    id:product[0].id,
    stock:product[0].stock_quantity,
    image:{src:product[0].image.src},
    parent_id:product[0].parent_id
  }
  
  return Response.json(data);
}
