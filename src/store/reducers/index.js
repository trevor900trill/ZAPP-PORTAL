// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import accounts from './accounts';
import countries from './countries';
import leaveDays from './leaveDays';
import dashboard from './dashboard';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu,
    accounts,
    leaveDays,
    countries,
    dashboard
});

export default reducers;
