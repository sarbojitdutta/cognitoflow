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
        console.log("token:", thunkAPI.getState().user.token);
        const res = await axios.put(`${API_ROUTE}/update`, formData, getConfig(thunkAPI));
        
        localStorage.setItem("user", JSON.stringify(res.data)); // Update local storage
        return res.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
    }
});

//  Handle GitHub Connection
export const connectGithub = createAsyncThunk("user/connectGithub", async (code, thunkAPI) => {
    try{
        const res = await axios.post(`${API_ROUTE}/github/connect`,
            {code},
            getConfig(thunkAPI)
        )

        const updatedUser = res.data.user
        localStorage.setItem("user", JSON.stringify(updatedUser))

        return updatedUser
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Github connection failed")
    }
});

export const disconnectGithub = createAsyncThunk("user/disconnectGithub", async (_, thunkAPI) => {
    try{
        const res = await axios.post(`${API_ROUTE}/github/disconnect`,
            getConfig(thunkAPI)
        )

        const updatedUser = res.data.user
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return updatedUser
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Github disconnection failed")
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
                state.user = action.payload.user || action.payload;
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

            //github connection
            .addCase(connectGithub.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(connectGithub.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Updates the global user with the new GitHub data
                state.message = "GitHub Connected Successfully!";
            })
            .addCase(connectGithub.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //github disconnection
            .addCase(disconnectGithub.pending, (state) => {
                state.loading = true;
            })
            .addCase(disconnectGithub.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Updates the global user (isGithubConnected: false)
                state.message = "GitHub Disconnected.";
            })
            .addCase(disconnectGithub.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { logout, rehydrateUser, setUser } = userSlice.actions;
export default userSlice.reducer;