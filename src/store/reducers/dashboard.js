// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { url, getHeaders, postHeaders } from 'store/ip';

export const fetchdashboard = createAsyncThunk('dashboard/fetchdashboard', async () => {
    const params = {
        headers: getHeaders(''),
        method: 'GET'
    };
    const response = await fetch(url + '/dashboard', params);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else if (response.status == 401) {
        throw new Error('Unauthorized');
    } else {
        throw new Error(data.message);
    }
});

// ==============================|| SLICE - ACCOUNTS ||============================== //

const dashboard = createSlice({
    name: 'dashboard',
    initialState: {
        hasError: false,
        isLoading: false,
        errorMessage: '',
        dashboardReponse: {
            noOfCompleteOrders: 0,
            noOfUsers: 0,
            totalEarnings: 0,
            todaysEarnings: 0,
            activePostsCount: 0,
            inactivePostsCount: 0,
            zappUsersCount: 0,
            zappCourierUsersCount: 0,
            users: [],
            zappUsers: [],
            zappCourierUsers: []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchdashboard.fulfilled, (state, action) => {
            return {
                ...state,
                hasError: false,
                isLoading: false,
                dashboardReponse: action.payload
            };
        });
        builder.addCase(fetchdashboard.rejected, (state, action) => {
            return {
                ...state,
                hasError: true,
                isLoading: false,
                errorMessage: action.error.message,
                dashboardReponse: {
                    noOfCompleteOrders: 0,
                    noOfUsers: 0,
                    totalEarnings: 0,
                    todaysEarnings: 0,
                    activePostsCount: 0,
                    inactivePostsCount: 0,
                    zappUsersCount: 0,
                    zappCourierUsersCount: 0,
                    users: [],
                    zappUsers: [],
                    zappCourierUsers: []
                }
            };
        });
        builder.addCase(fetchdashboard.pending, (state, action) => {
            return {
                ...state,
                isLoading: true
            };
        });
    },
    reducers: {}
});

export default dashboard.reducer;

export const {} = dashboard.actions;
