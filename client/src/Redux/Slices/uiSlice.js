import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isOpen: false,
    },
    reducers: {
        openAuth: (state) => {
            state.isOpen = true;
        },
        closeAuth: (state) => {
            state.isOpen = false;
        },
        toggleAuth: (state) => {
            state.isOpen = !state.isOpen;
        },
    },

})

export const {openAuth, closeAuth, toggleAuth} = authSlice.actions
export default authSlice.reducer