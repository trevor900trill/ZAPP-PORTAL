// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders } from 'store/ip';
import { logOut } from './accounts';

export const fetchBanks = createAsyncThunk('banks/fetchBanks', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/Bank/GetAllBanks', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const addbanks = createAsyncThunk('banks/addbanks', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/Bank/AddBank', params);
    if (response.status == 200 || response.status == 201) {
        return null;
    } else {
        throw new Error(data.message);
    }
});

export const editbanks = createAsyncThunk('banks/editbanks', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'PUT',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/Bank/UpdateBank/' + body.id, params);
    if (response.status == 200 || response.status == 201 || response.status == 204) {
        return null;
    } else {
        throw new Error(data.message);
    }
});
// ==============================|| SLICE - ACCOUNTS ||============================== //

const banks = createSlice({
    name: 'banks',
    initialState: {
        hasError: false,
        errorMessage: '',
        isLoading: false,
        banksreponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBanks.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                banksreponse: action.payload
            };
        });
        builder.addCase(fetchBanks.rejected, (state, action) => {
            console.log(action);
            return {
                ...state,
                hasError: true,
                errorMessage: action.error.message,
                isLoading: false,
                banksreponse: []
            };
        });
        builder.addCase(fetchBanks.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(addbanks.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(addbanks.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(addbanks.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(editbanks.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(editbanks.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(editbanks.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
    },
    reducers: {}
});

export default banks.reducer;

export const {} = banks.actions;
