
import { create } from 'zustand';





interface State {
    
    CartLoad:boolean;
    CartItems:number;

    setCartLoad:(bool:boolean)=>void;
    setCartItems:(num:number)=>void

}

export const CartState = create<State>()((set) => ({
    CartLoad:true,
    CartItems:0,

    setCartLoad:(bool)=>set({CartLoad:bool}),
    setCartItems:(num)=>set({CartItems:num})
    
    }))
