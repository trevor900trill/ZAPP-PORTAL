// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchregions = createAsyncThunk('regions/fetchregions', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/Region/GetAllRegions', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const addregions = createAsyncThunk('regions/addregions', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/Region/AddRegion', params);
    if (response.status == 200 || response.status == 201) {
        return null;
    } else {
        throw new Error(data.message);
    }
});

export const editregions = createAsyncThunk('regions/editregions', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'PUT',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/Region/UpdateRegion/' + body.id, params);
    if (response.status == 200 || response.status == 201 || response.status == 204) {
        return null;
    } else {
        throw new Error(data.message);
    }
});
// ==============================|| SLICE - ACCOUNTS ||============================== //

const regions = createSlice({
    name: 'regions',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        regionsReponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchregions.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                regionsReponse: action.payload
            };
        });
        builder.addCase(fetchregions.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                regionsReponse: []
            };
        });
        builder.addCase(fetchregions.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(addregions.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(addregions.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(addregions.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(editregions.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(editregions.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(editregions.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
    },
    reducers: {}
});

export default regions.reducer;

export const {} = regions.actions;
