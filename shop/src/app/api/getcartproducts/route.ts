import { type NextRequest } from "next/server";
import { cookies } from "next/headers";


export async function GET(request: NextRequest) {
  const data = await cookies().get("products");
  if (data?.value!) {
    return Response.json(JSON.parse(data.value))
  } else {
    return Response.json([])
  }
  
}
