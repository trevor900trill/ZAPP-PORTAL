// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchroles = createAsyncThunk('roles/fetchroles', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/Roles/GetAllRoles', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const fetchuserroles = createAsyncThunk('roles/fetchuserroles', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/Roles/GetAllRoles', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const addroles = createAsyncThunk('roles/addroles', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/Customerroles/AddCustomerroles', params);
    const data = await response.json();
    if (response.status == 200 || response.status == 201) {
        return data;
    } else {
        throw new Error(data.message);
    }
});
// ==============================|| SLICE - ACCOUNTS ||============================== //

const roles = createSlice({
    name: 'roles',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        rolesReponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchroles.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                rolesReponse: action.payload
            };
        });
        builder.addCase(fetchroles.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                rolesReponse: []
            };
        });
        builder.addCase(fetchroles.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
        builder.addCase(addroles.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                errorMessage: action.error.message
            };
        });
    },
    reducers: {}
});

export default roles.reducer;

export const {} = roles.actions;
