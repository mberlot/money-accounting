import { createAction } from 'redux-actions';
import { api } from '../configs/networkConfig';

export const getCurrentBalanceRequest = createAction('REQUEST_CURRENT_BALANCE');
export const getCurrentBalanceSuccess = createAction('REQUEST_CURRENT_BALANCE_SUCCESS');
export const getCurrentBalanceFailed = createAction('REQUEST_CURRENT_BALANCE_FAILED');
export const newTransactionRequest = createAction('REQUEST_NEW_TRANSACTION');
export const newTransactionSuccess = createAction('REQUEST_NEW_TRANSACTION_SUCCESS');
export const newTransactionFailed = createAction('REQUEST_NEW_TRANSACTION_FAILED');

export const getCurrentBalance = () => async (dispatch) => {
    dispatch(getCurrentBalanceRequest());
    try {
        const response = await api.get('/currentBalance');
        dispatch(getCurrentBalanceSuccess({ accountInfo: response.data.accountInfo }));
    }
    catch(err) {
        dispatch(getCurrentBalanceFailed(err));
    }
};


export const newTransaction = (amount, type) => async (dispatch) => {
    dispatch(newTransactionRequest());
    try {
        const response = await api.post('/newTransaction', {
            amount,
            type
        });
        dispatch(newTransactionSuccess());
    }
    catch(err) {
        dispatch(newTransactionFailed(err));
    }
};
