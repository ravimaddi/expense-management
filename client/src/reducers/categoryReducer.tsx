import { Category} from './types'
let initialState: Category[]=[]
const categoryReducer=(state=initialState,action:any)=>{
    switch(action.type){
        case 'CATEGORY_LIST':
            return [...action.payload]
        case 'ADD_CATEGORY':
            return [...state,action.payload]
        case "REMOVE_CATEGORY":
            return state.filter((c:{_id:string})=>{return c._id!==action.payload})

        default :
        return [...state]
        
    }
}

export default categoryReducer