// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import accounts from './accounts';
import kyc from './kyc';
import banks from './banks';
import permissions from './permissions';
import roles from './roles';
import locations from './locations';
import countries from './countries';
import counties from './counties';
import localities from './localities';
import subcounties from './subcounties';
import regions from './regions';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu,
    accounts,
    kyc,
    banks,
    permissions,
    roles,
    locations,
    localities,
    countries,
    counties,
    subcounties,
    regions
});

export default reducers;
