import React from "react";
import Spinner from "react-bootstrap/Spinner";
import {useSelector} from "react-redux";
import Table from "react-bootstrap/Table";

const FetchState = {
    NOT_FETCHED: 'NOT_FETCHED',
    FETCHING: 'FETCHING',
    FETCHED: 'FETCHED',
};

const transactionType = {
    DEBIT: 'DEBIT',
    CREDIT: 'CREDIT'
};

const Transactions = ({ transactions }) => {
    const account = useSelector( state => state.account.accountInfo );
    const fetchState = useSelector( state => state.account.fetchState );

    return (
      <>
          {fetchState === FetchState.FETCHING &&
              <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
              </Spinner>
          }
          {fetchState === FetchState.FETCHED && account.transaction && account.transaction.length > 0 &&
              <Table striped bordered hover>
                  <thead>
                  <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  {account.transaction && account.transaction.length > 0 && account.transaction.map((item, index) => {
                      return (
                          <tr key={index}>
                              <td>{item.effectiveDate}</td>
                              <td><span className={(item.type === transactionType.DEBIT) ? "badge badge-pill badge-primary" : "badge badge-pill badge-dark"}>{item.type}</span></td>
                              <td>{item.amount}</td>
                          </tr>
                      )
                  })}
                  </tbody>
              </Table>
          }
          {fetchState === FetchState.FETCHED && account.transaction && account.transaction.length === 0 &&
          <p>There is no movement into your account.</p>
          }
      </>
    );
}

export default Transactions;
