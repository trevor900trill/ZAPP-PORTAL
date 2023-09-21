// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import accounts from './accounts';
import countries from './countries';
import leaveDays from './leaveDays';
import dashboard from './dashboard';
import shops from './shops';
import users from './users';
import contributors from './contributors';
import locations from './locations';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu,
    accounts,
    leaveDays,
    countries,
    dashboard,
    shops,
    contributors,
    users,
    locations
});

export default reducers;
