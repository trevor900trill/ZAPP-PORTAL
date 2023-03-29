// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchKYC = createAsyncThunk('kyc/fetchKYC', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/CustomerKyc/GetAllCustomerKyc', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const addKyc = createAsyncThunk('kyc/addKyc', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/CustomerKyc/AddCustomerKyc', params);
    const data = await response.json();
    if (response.status == 200 || response.status == 201) {
        return data;
    } else {
        throw new Error(data.message);
    }
});
// ==============================|| SLICE - ACCOUNTS ||============================== //

const kyc = createSlice({
    name: 'kyc',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        kycreponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchKYC.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                kycreponse: action.payload
            };
        });
        builder.addCase(fetchKYC.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                kycreponse: []
            };
        });
        builder.addCase(fetchKYC.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
        builder.addCase(addKyc.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                errorMessage: action.error.message
            };
        });
    },
    reducers: {}
});

export default kyc.reducer;

export const {} = kyc.actions;
