// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchLeaveApplications = createAsyncThunk('LeaveApplications/fetchLeaveApplications', async (body) => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/LeaveApplications/employee/' + body, params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

export const addLeaveApplications = createAsyncThunk('LeaveApplications/addLeaveApplications', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'POST',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/LeaveApplications/ApplyLeave', params);
    if (response.status == 200 || response.status == 201) {
        return null;
    } else {
        throw new Error(data.message);
    }
});

export const editLeaveApplications = createAsyncThunk('LeaveApplications/editLeaveApplications', async (body) => {
    const params = {
        headers: postHeaders(),
        method: 'PUT',
        body: JSON.stringify(body)
    };
    const response = await fetch(url + '/LeaveApplications/' + body.id, params);
    if (response.status == 200 || response.status == 201 || response.status == 204) {
        return null;
    } else {
        throw new Error(data.message);
    }
});
// ==============================|| SLICE - ACCOUNTS ||============================== //

const LeaveApplications = createSlice({
    name: 'LeaveApplications',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        LeaveApplicationsReponse: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLeaveApplications.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                LeaveApplicationsReponse: action.payload
            };
        });
        builder.addCase(fetchLeaveApplications.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                LeaveApplicationsReponse: []
            };
        });
        builder.addCase(fetchLeaveApplications.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(addLeaveApplications.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(addLeaveApplications.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(addLeaveApplications.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });

        builder.addCase(editLeaveApplications.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message
            };
        });
        builder.addCase(editLeaveApplications.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false
            };
        });
        builder.addCase(editLeaveApplications.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
    },
    reducers: {}
});

export default LeaveApplications.reducer;

export const {} = LeaveApplications.actions;
