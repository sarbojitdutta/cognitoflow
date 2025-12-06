import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ROUTE = "http://localhost:3000/api/auth"

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");

export const registerUser = createAsyncThunk("user/register", async (formData, thunkAPI) => {
    try {
        const res = await axios.post(`${API_ROUTE}/register`, formData, { withCredentials: true });
        const {user, token} =  res.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        return {user, token}
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const loginUser = createAsyncThunk("user/login", async (formdata, thunkAPI) => {
    try{
        const res = await axios.post(`${API_ROUTE}/login`, formdata, { withCredentials: true });
        const {user, token} = res.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        return {user, token}
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateUser = createAsyncThunk("user/update", async (formData, thunkAPI) => {
    try{
        let token = thunkAPI.getState().user.token
        if(!token) token = localStorage.getItem("token")
        const res = await axios.put(`${API_ROUTE}/update`, formData, { withCredentials: true,
            header: {
                Authorization: `Bearer ${token}`
            }
         });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return res.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: storedUser || null,
        token: storedToken || null,
        loading: false,
        error: null
    },

    reducers: {
        logout: (state) =>{
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
        rehydrateUser: (state) =>{
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token")
            if(user && token){
                state.user = user
                state.token = token
            }
        },
    },
    extraReducers: (builder) =>{
        builder
            .addCase(registerUser.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action)=>{
                state.loading = false;
                state.error = true;
            })
            .addCase(loginUser.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action)=>{
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    },


})

export const { logout, rehydrateUser } = userSlice.actions;
export default userSlice.reducer;