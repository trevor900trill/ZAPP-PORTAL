// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchcounties = createAsyncThunk('counties/fetchcounties', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/County/GetAllCounties', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const addcounties = createAsyncThunk('counties/addcounties', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/County/AddCounty', params);
    if (response.status == 200 || response.status == 201) {
        return null;
    } else {
        throw new Error(data.message);
    }
});

export const editcounties = createAsyncThunk('counties/editcounties', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'PUT',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/County/UpdateCounty/' + body.id, params);
    if (response.status == 200 || response.status == 201 || response.status == 204) {
        return null;
    } else {
        throw new Error(data.message);
    }
});
// ==============================|| SLICE - ACCOUNTS ||============================== //

const counties = createSlice({
    name: 'counties',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        countiesReponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchcounties.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                countiesReponse: action.payload
            };
        });
        builder.addCase(fetchcounties.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                countiesReponse: []
            };
        });
        builder.addCase(fetchcounties.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(addcounties.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(addcounties.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(addcounties.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(editcounties.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(editcounties.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(editcounties.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
    },
    reducers: {}
});

export default counties.reducer;

export const {} = counties.actions;
