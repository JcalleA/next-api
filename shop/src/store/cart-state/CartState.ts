
import { create } from 'zustand';





interface State {
    
    CartId:boolean;
    CartItems:number;

    setCartlId:(bool:boolean)=>void;
    setCartItems:(num:number)=>void

}

export const CartState = create<State>()((set) => ({
    CartId:true,
    CartItems:0,

    setCartlId:(bool)=>set({CartId:bool}),
    setCartItems:(num)=>set({CartItems:num})
    
    }))
