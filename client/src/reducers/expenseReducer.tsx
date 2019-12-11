import { Expense} from './types'

let initialState: Expense[]=[]
const expenseReducer=(state=initialState ,action:any)=>{
    switch(action.type){
        case 'SET_EXPENSE':
            return [...state,action.payload]
        case 'EXPENSE_LIST':
            return [...action.payload]
        case 'EDIT_EXPENSE':
            return state.map((e:{_id:string})=>{if(e._id===action.payload._id){
                return action.payload
                }
                else{
                return e
                }
            })
        case 'REMOVE_EXPENSE':
            return state.filter((e:{_id:string})=>{return e._id!==action.payload})

        default :
        return [...state]
        
    }
}

export default expenseReducer