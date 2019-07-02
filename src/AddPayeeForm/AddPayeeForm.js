import React, { Component } from 'react';
import style from './AddPayeeForm.module.css';
//import axios from '../axios';

class PayeeForm extends Component {
	state = {
		payees: {
			payee: '',
			accountNumber: '',
			zipCode: '',
			payments: []
		},
	}

	isValidAccountNum = () => {
		for ( let i = 0; i < this.props.payees.length; i++ ) {
			if ( this.props.payees[ i ].accountNumber === this.state.payees.accountNumber ) {
				return false;
			}
		}
		return true;
	}

	isValidZip = () => {
		const state = { ...this.state.payees };
		const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		const isValidZip = zipCodeRegex.test( state.zipCode );
		return isValidZip;
	}

	handleSubmit = ( event ) => {
		event.preventDefault();
		if ( this.isValidZip() && this.isValidAccountNum() ) {
			this.props.addItem( this.state.payees ) //called from SavedPayees

			//  const payee =  {
			// 	payee: this.state.payees.payee,
			// 	accountNumber: this.state.payees.accountNumber.toUpperCase(),
			// 	zipCode: this.state.payees.zipCode,
			// 	payments: []
			// }
			// axios.post( '/payees.json', payee )
			// 	.then( response => console.log( response ) )
			// 	.catch( error => console.log( error ) );
		}

		// else console.log( 'invalid input field' );
		this.setState( {
			payees: {
				payee: '',
				accountNumber: '',
				zipCode: '',
				payments: []
			}
		} )
	}

	handleChange = ( event ) => {
		const name = event.target.name;
		const payees = { ...this.state.payees }
		payees[ name ] = event.target.value;

		this.setState( { payees: payees } );
	}


	render() {
		const payeeName = 'Max of 30 characters allowed';
		const payeeAccount = 'Max of 16 characters allowed';

		return (
			<div>
				<h2 style={ { textAlign: 'center' } }>Bill Payments Tracker</h2>
				<div>
					<form onSubmit={ this.handleSubmit } className={ style.addPayeeForm }>
						<label htmlFor='payee' className={ `${ style.addPayeeLabel } ` }>Payee</label>
						<input
							type='text' id='payee' name='payee'
							minLength='5' maxLength='30' required
							size='30' value={ this.state.payees.payee } onChange={ this.handleChange }
						/>
						<p className={ style.payeeWarning }>
							{ this.state.payees.payee.length >= 30 ? payeeName : null }
						</p>


						<label htmlFor='accountNumber' className={ `${ style.addPayeeLabel }  ${ style.accountNumber }` }>Account Number</label>
						<input
							type='text' id='accountNumber' name='accountNumber'
							minLength='8' maxLength='16' required
							value={ this.state.payees.accountNumber } onChange={ this.handleChange }
						/>
						<p className={ style.accountNumWarning }>
							{ this.state.payees.accountNumber.length >= 16 ? payeeAccount : null }
						</p>
						<p className={ style.duplicateAccountWarning }>
							{ this.isValidAccountNum() ? null : 'This account number already exists' }
						</p>


						<label htmlFor='zipCode' className={ ` ${ style.addPayeeLabel } ${ style.zipCode } ` } >Zip Code</label>
						<input
							type='text' id='zipCode' name='zipCode'
							minLength='5' maxLength='10' required
							value={ this.state.payees.zipCode } onChange={ this.handleChange }
						/>

						<p className={ style.validZipCode }> Example: 12345 or 12345-0000</p>

						<button className={ style.payeeButton }>ADD</button>
					</form>
				</div>
			</div>

		)
	}
}

export default PayeeForm;