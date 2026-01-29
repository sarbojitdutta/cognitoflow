import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ROUTE = "http://localhost:3000/api/auth";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");


const getConfig = (thunkAPI) => {
    let token = thunkAPI.getState().user.token;
    if (!token) token = localStorage.getItem("token");
    
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    };
};

export const registerUser = createAsyncThunk("user/register", async (formData, thunkAPI) => {
    try {
        const res = await axios.post(`${API_ROUTE}/register`, formData, { withCredentials: true });
        const { user, token } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        return { user, token };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
    }
});

export const loginUser = createAsyncThunk("user/login", async (formdata, thunkAPI) => {
    try {
        const res = await axios.post(`${API_ROUTE}/login`, formdata, { withCredentials: true });
        const { user, token } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        return { user, token };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
});

export const updateUser = createAsyncThunk("user/update", async (formData, thunkAPI) => {
    try {
        
        const res = await axios.put(`${API_ROUTE}/update`, formData, getConfig(thunkAPI));
        
        localStorage.setItem("user", JSON.stringify(res.data)); // Update local storage
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
    }
});

//  Handle GitHub Connection
export const connectGithub = createAsyncThunk("user/connectGithub", async (githubUsername, thunkAPI) => {
    try {
        const res = await axios.put(
            `${API_ROUTE}/github-connect`, 
            { githubUsername }, 
            getConfig(thunkAPI)
        );
        
        // Update local storage immediately so it persists on refresh
        localStorage.setItem("user", JSON.stringify(res.data));
        
        return res.data; // Returns the updated User object
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Connection failed");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: storedUser || null,
        token: storedToken || null,
        loading: false,
        error: null
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
        rehydrateUser: (state) => {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");
            if (user && token) {
                state.user = user;
                state.token = token;
            }
        },
        // Optional: A manual setter if you ever need to update state directly
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // Login
            .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // Update
            .addCase(updateUser.pending, (state) => { state.loading = true; })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // 👇 CONNECT GITHUB CASES
            .addCase(connectGithub.pending, (state) => { state.loading = true; })
            .addCase(connectGithub.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Updates Redux state with new Github info
            })
            .addCase(connectGithub.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, rehydrateUser, setUser } = userSlice.actions;
export default userSlice.reducer;