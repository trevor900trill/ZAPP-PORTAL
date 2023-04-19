// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, loginHeaders } from 'store/ip';

export const logIn = createAsyncThunk('accounts/logIn', async (body) => {
    const params = {
        headers: loginHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/login', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Invalid email or password');
    } else {
        const responseBody = await response.text();
        throw new Error(responseBody);
    }
});

// ==============================|| SLICE - ACCOUNTS ||============================== //

const accounts = createSlice({
    name: 'accounts',
    initialState: {
        isLoggedIn: false,
        hasError: false,
        errorMessage: '',
        user: null
    },
    extraReducers: (builder) => {
        builder.addCase(logIn.fulfilled, (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                hasError: false,
                user: action.payload
            };
        });
        builder.addCase(logIn.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                errorMessage: action.error.message,
                user: null
            };
        });
    },
    reducers: {
        logOut(state) {
            localStorage.clear();
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        },

        setLoggedIn(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },

        setUser(state, action) {
            state.user = action.payload.user;
        }
    }
});

export default accounts.reducer;

export const { logOut, setLoggedIn, setUser } = accounts.actions;
