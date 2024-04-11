import { notFound } from "next/navigation";


interface Props{
  params:{
    id:string
  }
}



export default function category ({params}:Props) {
  const {id}=params
  if (id != "camisetas" ){
    notFound();
  }

    return (
      <div>
        <h1>Category Page</h1>
      </div>
    );
  }