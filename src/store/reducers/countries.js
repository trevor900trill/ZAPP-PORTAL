// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchcountries = createAsyncThunk('countries/fetchcountries', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/Country/GetAllCountries', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const addcountries = createAsyncThunk('countries/addcountries', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/Country/AddCountry', params);
    if (response.status == 200 || response.status == 201) {
        return null;
    } else {
        throw new Error(data.message);
    }
});

export const editcountries = createAsyncThunk('countries/editcountries', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'PUT',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/Country/UpdateCountry/' + body.id, params);
    if (response.status == 200 || response.status == 201 || response.status == 204) {
        return null;
    } else {
        throw new Error(data.message);
    }
});
// ==============================|| SLICE - ACCOUNTS ||============================== //

const countries = createSlice({
    name: 'countries',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        countriesReponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchcountries.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                countriesReponse: action.payload
            };
        });
        builder.addCase(fetchcountries.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                countriesReponse: []
            };
        });
        builder.addCase(fetchcountries.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(addcountries.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(addcountries.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(addcountries.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(editcountries.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(editcountries.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(editcountries.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
    },
    reducers: {}
});

export default countries.reducer;

export const {} = countries.actions;
