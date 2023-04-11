// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchleaveTypes = createAsyncThunk('leaveTypes/fetchleaveTypes', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/LeaveTypes', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const addleaveTypes = createAsyncThunk('leaveTypes/addleaveTypes', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/LeaveTypes', params);
    if (response.status == 200 || response.status == 201) {
        return null;
    } else {
        throw new Error(data.message);
    }
});

export const editleaveTypes = createAsyncThunk('leaveTypes/editleaveTypes', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'PUT',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/LeaveTypes/' + body.id, params);
    if (response.status == 200 || response.status == 201 || response.status == 204) {
        return null;
    } else {
        throw new Error(data.message);
    }
});
// ==============================|| SLICE - ACCOUNTS ||============================== //

const leaveTypes = createSlice({
    name: 'leaveTypes',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        leaveTypesReponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchleaveTypes.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                leaveTypesReponse: action.payload
            };
        });
        builder.addCase(fetchleaveTypes.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                leaveTypesReponse: []
            };
        });
        builder.addCase(fetchleaveTypes.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(addleaveTypes.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(addleaveTypes.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(addleaveTypes.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(editleaveTypes.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(editleaveTypes.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(editleaveTypes.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
    },
    reducers: {}
});

export default leaveTypes.reducer;

export const {} = leaveTypes.actions;
