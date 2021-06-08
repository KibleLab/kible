import {combineReducers} from 'redux';
import menuManagement from './menuManagement';
import menuSelect from './menuSelect';
import orderSheet from './orderSheet';

const rootReducer = combineReducers({menuManagement, menuSelect, orderSheet});

export default rootReducer;
