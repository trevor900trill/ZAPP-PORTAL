// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchPermissions = createAsyncThunk('permissions/fetchPermissions', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/Permission/GetAllUsers', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const addpermissions = createAsyncThunk('permissions/addpermissions', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/Customerpermissions/AddCustomerpermissions', params);
    const data = await response.json();
    if (response.status == 200 || response.status == 201) {
        return data;
    } else {
        throw new Error(data.message);
    }
});
// ==============================|| SLICE - ACCOUNTS ||============================== //

const permissions = createSlice({
    name: 'permissions',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        permissionsReponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPermissions.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                permissionsReponse: action.payload
            };
        });
        builder.addCase(fetchPermissions.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                permissionsReponse: []
            };
        });
        builder.addCase(fetchPermissions.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
        builder.addCase(addpermissions.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                errorMessage: action.error.message
            };
        });
    },
    reducers: {}
});

export default permissions.reducer;

export const {} = permissions.actions;
