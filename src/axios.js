import axios from 'axios';

const instance = axios.create( {
    baseURL: 'https://bill-payments-tracker.firebaseio.com/'
} );
export default instance;
