// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchcontributors = createAsyncThunk('contributors/fetchcontributors', async (id) => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/contributors/' + id, params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const addcontributors = createAsyncThunk('contributors/addcontributors', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/addContributor', params);
    if (response.status == 200 || response.status == 201) {
        return null;
    } else {
        throw new Error(data.message);
    }
});

export const deletecontributors = createAsyncThunk('contributors/deletecontributors', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'DELETE',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/removeContributor?id=' + body.id + '&shopId=' + body.shopId, params);
    if (response.status == 200 || response.status == 201 || response.status == 204) {
        return null;
    } else {
        throw new Error(data.message);
    }
});
// ==============================|| SLICE - ACCOUNTS ||============================== //

const contributors = createSlice({
    name: 'contributors',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        contributorsReponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchcontributors.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                contributorsReponse: action.payload
            };
        });
        builder.addCase(fetchcontributors.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                contributorsReponse: []
            };
        });
        builder.addCase(fetchcontributors.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(addcontributors.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(addcontributors.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(addcontributors.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(deletecontributors.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(deletecontributors.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(deletecontributors.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
    },
    reducers: {}
});

export default contributors.reducer;

export const {} = contributors.actions;
