// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchusers = createAsyncThunk('users/fetchusers', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/users', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

// ==============================|| SLICE - ACCOUNTS ||============================== //

const users = createSlice({
    name: 'users',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        usersReponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchusers.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                usersReponse: action.payload
            };
        });
        builder.addCase(fetchusers.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                usersReponse: []
            };
        });
        builder.addCase(fetchusers.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
    },
    reducers: {}
});

export default users.reducer;

export const {} = users.actions;
