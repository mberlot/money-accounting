import { handleActions } from 'redux-actions';
import {
    getCurrentBalanceRequest,
    getCurrentBalanceSuccess,
    getCurrentBalanceFailed,
    newTransactionRequest,
    newTransactionSuccess,
    newTransactionFailed
} from '../actions/account';

const FetchState = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    FETCHED: 'FETCHED',
};

const initialState = {
    fetchState: FetchState.NOT_FETCHED,
    accountInfo: {},
    errorMessage: ''
};

export default handleActions({
        [getCurrentBalanceRequest]: state => ({ ...state, fetchState: FetchState.FETCHING }),
        [getCurrentBalanceSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
            fetchState: FetchState.FETCHED,
            errorMessage: initialState.error,
        }),
        [getCurrentBalanceFailed]: (state, action) => ({
            ...state,
            fetchState: FetchState.FETCHED,
            errorMessage: action.payload,
        }),
        [newTransactionRequest]: state => ({ ...state, fetchState: FetchState.FETCHING }),
        [newTransactionSuccess]: (state) => ({
            ...state,
            fetchState: FetchState.FETCHED,
            errorMessage: initialState.error,
        }),
        [newTransactionFailed]: (state, action) => ({
            ...state,
            fetchState: FetchState.FETCHED,
            errorMessage: action.payload,
        }),
    },
    initialState);
