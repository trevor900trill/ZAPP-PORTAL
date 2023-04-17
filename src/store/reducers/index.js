// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import accounts from './accounts';
import countries from './countries';
import leaveDays from './leaveDays';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu,
    accounts,
    leaveDays,
    countries
});

export default reducers;
