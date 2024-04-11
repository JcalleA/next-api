import { create } from 'zustand';


interface State {
    isMenuOpen: boolean;
    isModalOpen: boolean;
    ModalId:number;

    openMenu:()=> void;
    closeMenu:()=> void;
    openModal:()=> void;
    closeModal:()=> void;
    setModalId:(id:number)=>void;
}

export const useStore = create<State>()((set) => ({
    isMenuOpen:false,
    isModalOpen:false,
    ModalId:0,

    openMenu:()=> set({isMenuOpen:true}),
    closeMenu:()=> set({isMenuOpen:false}),
    openModal:()=> set({isModalOpen:true}),
    closeModal:()=> set({isModalOpen:false}),
    setModalId:(id)=>set({ModalId:id})
}))