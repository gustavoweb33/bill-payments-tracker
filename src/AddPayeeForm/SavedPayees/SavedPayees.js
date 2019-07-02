import React, { Component } from 'react';
import AddPayeeForm from '../AddPayeeForm';
import DisplayTransactions from './DisplayTransactions/DisplayTransactions';
import style from './SavedPayees.module.css';
import axios from '../../axios';

class AddPayee extends Component {
    state = {
        payees: [
            {
                payee: 'WATER BILL',
                accountNumber: '80923492',
                zipCode: '77087',
                payments: [
                    {
                        referenceNumber: '758894FGT858',
                        ammount: 99.88,
                        date: '04/04/2018'
                    },
                    {
                        referenceNumber: '4358904850GHY',
                        ammount: 102.45,
                        date: '05/04/2018'
                    }
                ]
            },

            {
                payee: 'GAS BILL',
                accountNumber: '9345489734',
                zipCode: '77023',
                payments: [
                    {
                        referenceNumber: '93475473495GTG',
                        ammount: 200.90,
                        date: '02/04/2018'
                    },
                    {
                        referenceNumber: '9758973854GT948',
                        ammount: 99.99,
                        date: '03/04/2018'
                    }
                ]
            }

        ],
        firebase: {}
    }
    async componentDidMount() {
        // console.log( 'component did mount from saved payees' )
        // let response = await axios.get( 'https://bill-payments-tracker.firebaseio.com/payees.json' );
        // //console.log(response.data )
        // const payeesFirebase = [];
        // for(let key in response.data) {
        //    payeesFirebase.push(response.data[key])
        // }
        // this.setState({firebase: payeesFirebase});
       
    }
    addItem = ( newPayee ) => {
        newPayee.accountNumber = newPayee.accountNumber.toUpperCase();
        newPayee.payee = newPayee.payee.toUpperCase();
        this.setState( ( prevState ) =>
            ( { payees: [ ...prevState.payees, newPayee ] } )
        );
    }


    addTransaction = ( transaction, payeeId, index ) => {
        const payees = [ ...this.state.payees ]; //copy of the state
        let payeeIndex = payees[ index ];    //the state index from the copy to add new transactions

        payeeIndex.payments.push( transaction );
        payees[ index ] = payeeIndex;

        this.setState( { payees: payees } );
    }

    deletePayee = ( deleteAccountNumber ) => {
        const deletePayee = window.confirm( 'Delete selected payee?' );
        if ( deletePayee ) {
            const payees = [ ...this.state.payees ];
            const newPayees = payees.filter( ( payee ) => payee.accountNumber !== deleteAccountNumber );
            this.setState( { payees: newPayees } );
        }
        else return false;
    }

    deleteTransaction = ( referenceNumber, index ) => {
        //copy array -> filter through seleted payee payments 
        //              -> return new array without the deleted selected transaction 
        //                  -> updated payments array from the state copy
        //                      -> update state with new payments

        let payees = [ ...this.state.payees ];
        let residingPayeePayements = payees[ index ].payments; //array to filter through

        const updatedPayments = residingPayeePayements.filter( ( payment ) => payment.referenceNumber !== referenceNumber );

        payees[ index ].payments = updatedPayments;
        this.setState( { payees: payees } );
    }

    render() {
console.log(this.state.firebase)
        return (
            <div >
                <AddPayeeForm addItem={ this.addItem } payees={ this.state.payees } />
                {
                    this.state.payees.length !== 0 ?
                        this.state.payees.map( ( payee, index ) => {
                            return (
                                <div key={ payee.accountNumber } className={ style.payeesAndTransactions }>
                                    <div className={ style.savedPayessContainer }>
                                        <h3>{ payee.payee }</h3>
                                        <p>{ payee.accountNumber }</p>
                                        <p>{ payee.zipCode }</p>
                                        <button style={ { height: '20px' } } onClick={ () => this.deletePayee( payee.accountNumber ) }>Delete</button>
                                    </div>

                                    {
                                        this.state.payees[ index ].length === 0
                                            ? null
                                            : <DisplayTransactions
                                                payeeId={ this.state.payees[ index ].payee }
                                                transactionHistory={ this.state.payees[ index ] }
                                                addTransaction={ this.addTransaction }
                                                index={ index }
                                                deleteTransaction={ this.deleteTransaction }
                                            />
                                    }
                                </div>
                            )
                        } )
                        : <h3 style={ { textAlign: 'center' } }>No payees to display</h3>
                }
            </div>
        )
    }

}

export default AddPayee;