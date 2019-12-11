import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import axios from './config/axios'
import {setUser} from './actions/user'
import {startGetBudget,startGetCategory} from './actions/settings'
import {startGetExpense} from './actions/expense'
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';


const store = configureStore()

console.log(store.getState())
store.subscribe(()=>{
    console.log(store.getState())
})
if(localStorage.getItem('authToken')){
    axios.get('/users/account',{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then((response)=>{
        const user=response.data
        store.dispatch(setUser(user))
        store.dispatch<any>(startGetBudget())
        store.dispatch<any>(startGetCategory())
        store.dispatch<any>(startGetExpense())
    })
}

ReactDOM.render(<Provider store={store}>
<App /> </Provider> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
