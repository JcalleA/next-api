import { Inter, Montserrat_Alternates,Dancing_Script,Kaushan_Script,Bebas_Neue } from "next/font/google";



export const inter = Inter({ subsets: ["latin"] });

export const Bebas =Bebas_Neue({weight:["400"],subsets:["latin","latin-ext"]});

export const titleFont= Montserrat_Alternates({
    subsets:["latin"],
    weight:["500","700"]
})

export const Logo1Font= Dancing_Script({
    subsets:["latin"],
    weight:["500","700"]
})

export const Logo2Font= Kaushan_Script({
    subsets:["latin"],
    weight:["400"]
})
