import {createStore,combineReducers,applyMiddleware} from 'redux'
import userReducer from '../reducers/userReducer'
import thunk from 'redux-thunk'
import budgetReducer from '../reducers/budgetReducer'
import categoryReducer from '../reducers/categoryReducer'
import expenseReducer from '../reducers/expenseReducer'


const configureStore=()=>{
    const store = createStore(combineReducers({
        user:userReducer,
        budget:budgetReducer,
        categories:categoryReducer,
        expenses:expenseReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore