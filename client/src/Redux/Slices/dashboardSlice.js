import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchDashboardmetrics = createAsyncThunk("dashboard/fetchMetrics", async (_, thunkAPI) => {
    try {
        const res = await axios.get("http://localhost:3000/api/dashboard/metrics", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
        });
        return res.data;
    }catch (error){
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch dashboard metrics");
    }
});

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        metrics: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardmetrics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardmetrics.fulfilled, (state, action) => {
                state.loading = false;
                state.metrics = action.payload;
            })
            .addCase(fetchDashboardmetrics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch dashboard metrics";
            })
    },
})

export default dashboardSlice.reducer;
