// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchlocalities = createAsyncThunk('localities/fetchlocalities', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/Locality/GetAllLocalities', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const addlocalities = createAsyncThunk('localities/addlocalities', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/Locality/AddLocality', params);
    if (response.status == 200 || response.status == 201) {
        return null;
    } else {
        throw new Error(data.message);
    }
});

export const editlocalities = createAsyncThunk('localities/editlocalities', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'PUT',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/Locality/UpdateLocality/' + body.id, params);
    if (response.status == 200 || response.status == 201 || response.status == 204) {
        return null;
    } else {
        throw new Error(data.message);
    }
});
// ==============================|| SLICE - ACCOUNTS ||============================== //

const localities = createSlice({
    name: 'localities',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        localitiesReponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchlocalities.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                localitiesReponse: action.payload
            };
        });
        builder.addCase(fetchlocalities.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                localitiesReponse: []
            };
        });
        builder.addCase(fetchlocalities.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(addlocalities.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(addlocalities.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(addlocalities.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(editlocalities.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(editlocalities.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(editlocalities.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
    },
    reducers: {}
});

export default localities.reducer;

export const {} = localities.actions;
