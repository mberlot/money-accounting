import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {useDispatch} from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { newTransaction, getCurrentBalance }  from '../actions/account';


const transactionType = {
    DEBIT: 'DEBIT',
    CREDIT: 'CREDIT'
};

const schema = yup.object().shape({
    amount: yup.number().positive().integer().required(),
});

const CurrentBalance = ({ currentMoney }) => {

    const [show, setShow] = useState(false);
    const [transaction, setTransaction] = useState('');
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    const handleClose = () => setShow(false);

    const handleShow = (type) => {
        setShow(true);
        setTransaction(type);
    }

    const confirmTransaction = async () => {
        await dispatch(newTransaction(amount, transaction));
        setShow(false);
        dispatch(getCurrentBalance());
    }

    return (
        <>
            <div className='pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center'>
                <h1 className='display-4'>${currentMoney}</h1>
                <p className='text-muted'>Current balance</p>
                <Button variant="outline-dark" onClick={() => handleShow(transactionType.CREDIT)}>Credit</Button>{' '}
                <Button variant="outline-dark" onClick={() => handleShow(transactionType.DEBIT)}>Debit</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit(confirmTransaction)}>
                    <Modal.Header>{transaction}</Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={event => setAmount(event.target.value)} name='amount' type='number' min='1' ref={register({ required: true, maxLength: 20, min: 1})} />
                            <InputGroup.Append>
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        <p>{errors.amount?.message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit">
                            Apply
                        </Button>

                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default CurrentBalance;
