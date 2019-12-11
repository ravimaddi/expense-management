const userReducer=(state:any,action:any)=>{
    switch(action.type){
        case 'SET_USER':
            return {...action.payload}
        case 'UPDATE_USER':
            return {...action.payload}
        case 'REMOVE_USER': return {}
        default :
        return {...state}
        
    }
}

export default userReducer