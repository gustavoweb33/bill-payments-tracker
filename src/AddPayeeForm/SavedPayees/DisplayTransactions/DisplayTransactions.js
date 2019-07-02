import React, { useState } from 'react';
import AddTransaction from './AddTransaction/AddTransaction';
import style from './DisplayTransactions.module.css'



const DisplayPayments = ( { transactionHistory, addTransaction, payeeId, index, deleteTransaction } ) => {

    const [ displayForm, setDisplay ] = useState( false );

    let history = transactionHistory.payments.length === 0
        ? <h3>No Transaction History</h3>
        : <h3>Transaction History</h3>

    return (
        <div className={ style.payeesAndTransactions }>
            <div style={{height: '200px'}}>
                { history }
                <button className={ style.addTransaction } onClick={ () => { setDisplay( !displayForm ) } }>Add Transaction</button>
                { displayForm ?
                    <AddTransaction addTransaction={ addTransaction }
                        payeeId={ payeeId } index={ index }
                        transactionHistory={ transactionHistory }
                    /> : null
                }
            </div>

            <div className={ style.transactionHistoryContainer }>
                {
                    transactionHistory.payments.map( payment => {
                        return (
                            <div key={ payment.referenceNumber } className={ style.transactionBorder } >
                                <ul>
                                    <li>
                                        <span style={ { fontWeight: 'bold' } }>Transaction Number:</span> { payment.referenceNumber }

                                    </li>
                                    <li>
                                        <span style={ { fontWeight: 'bold' } }> Ammount:</span> { payment.ammount }
                                    </li>
                                    <li>
                                        <span style={ { fontWeight: 'bold' } }>Date:</span> { payment.date }
                                    </li>
                                </ul>
                                <button
                                    className={ style.deleteButton }
                                    onClick={ () => deleteTransaction( payment.referenceNumber, index ) }>
                                    Delete
                                </button>
                            </div>

                        );
                    } )
                }
            </div>
        </div>
    );
}

export default DisplayPayments;