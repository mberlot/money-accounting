import account from "./account";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    account
});

/**
 * Exports a root reducer on top of the App Reducer to be able to reset it's
 * state to its initial
 * @param state
 * @param action
 * @returns {any}
 */
export default (state, action) => {
    return allReducers(state, action);
};
