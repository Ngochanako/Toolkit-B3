import { createSlice } from "@reduxjs/toolkit";
import { Modal } from "../../interfaces";

const initialModal:Modal={
    warn:false,
    delete:false,
    input:false,
};
const modalReducer=createSlice(
    {
        name:'modal',
        initialState:initialModal,
        reducers:{
            activeModalWarn:(state)=>{
                state.warn=true;
            },
            disableModalWarn:(state)=>{
                state.warn=false;
            },
            activeModalDelete:(state)=>{
                state.delete=true;
            },
            disableModalDelete:(state)=>{
                state.delete=false;
            },
            activeModalInput:(state)=>{
                state.input=true;
            },
            disableModalInput:(state)=>{
                state.input=false;
            },
        }
    }
)
export const{activeModalWarn,disableModalWarn,activeModalDelete,disableModalDelete,activeModalInput,disableModalInput}=modalReducer.actions;
export default modalReducer.reducer;