import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBalance }  from '../actions/account';
import CurrentBalance from "./currentBalance";
import Transactions from "./transacctions";

const Home = props => {

    const dispatch = useDispatch();
    const account = useSelector( state => state.account.accountInfo );

    useEffect(() => {
        dispatch(getCurrentBalance());
    },[dispatch]);

    return (
        <div className='container'>

            <CurrentBalance
                currentMoney={account.currentMoney}
            />
            <Transactions/>
        </div>
    );
}

export default Home;
