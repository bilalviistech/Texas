import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    msg: "",
    user: {},
    token: "",
    loading: false,
    error: "",
};

export const loginUser = createAsyncThunk('LoginUser', async ({email, password}) => {

    let apiData = JSON.stringify({
        "email": email,
        "password": password
    });

    // const res = await axios.post("http://13.51.163.249:3020/api/user/login", body, {
    const res = await axios.post("https://yourappdemo.com/texassource/api/user/login", apiData, {
        headers: {
            'Content-Type': "application/json",
        }
    });
    
    console.log("results are", res.data);
    return res.data;
});

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = localStorage.getItem("token") || "";
        },
        addUser: (state, action) => {
            const user = localStorage.getItem("user");
            state.user = user ? JSON.parse(user) : {};
        },
        logout: (state, action) => {
            state.token = null;
            state.user = {};
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.success) {
                    state.token = action.payload?.data?.token;
                    state.user = action.payload?.data ;
                    localStorage.setItem('user', JSON.stringify(state.user));
                    localStorage.setItem('token', state.token);
                } else {
                    state.error = action.payload.message || "Login failed";
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { addToken, addUser, logout } = authSlice.actions;
export default authSlice.reducer;

