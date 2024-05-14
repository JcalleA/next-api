import { create } from 'zustand';


interface State {
    isMenuOpen: boolean;
    isModalOpen: boolean;
    ModalId:number;
    checkoutIsOpen:boolean;

    openMenu:()=> void;
    closeMenu:()=> void;
    openModal:()=> void;
    closeModal:()=> void;
    setModalId:(id:number)=>void;
    openCheckout:()=>void;
    closeCheckout:()=>void;
}

export const useStore = create<State>()((set) => ({
    isMenuOpen:false,
    isModalOpen:false,
    ModalId:0,
    checkoutIsOpen:false,

    openCheckout:()=>set({checkoutIsOpen:true}),
    closeCheckout:()=>set({checkoutIsOpen:false}),
    openMenu:()=> set({isMenuOpen:true}),
    closeMenu:()=> set({isMenuOpen:false}),
    openModal:()=> set({isModalOpen:true}),
    closeModal:()=> set({isModalOpen:false}),
    setModalId:(id)=>set({ModalId:id})
}))