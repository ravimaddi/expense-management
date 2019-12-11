import axios from '../config/axios'
import swal from 'sweetalert2'

export const setExpense = (expense:[]) => {
    return {
        type: 'EXPENSE_LIST',
        payload: expense
    }
}
export const addExpense=(expense:{})=>{
    return{
        type:'SET_EXPENSE',
        payload:expense
    }
}
export const editExpense=(expense:{})=>{
    return {
        type:'EDIT_EXPENSE',
        payload:expense
    }
}
export const removeExpense =(id:string)=>{
    return{
        type:'REMOVE_EXPENSE',
        payload:id
    }
}


export const startSetExpense=(expense:{})=>{
    return((dispatch:any)=>{
        axios.post('/expense',expense,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.errors){
                swal.fire(`${response.data.errors.message}`,"","error")
            }
            else{
            dispatch(addExpense(response.data))
            }
        })
        .catch((err)=>{
            alert(err)
        })
    })
}

export const startGetExpense=()=>{
    return((dispatch:any)=>{
        axios.get('/expense',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.errors){
                swal.fire(`${response.data.errors.message}`,"","error")
            }
            else{
                dispatch(setExpense(response.data))
            }
        })
        .catch((err)=>{
            swal.fire(`${err}`,"","error")
        })
    })

}

export const startUpdateExpense=(expense:{},id:string)=>{
    return((dispatch:any)=>{
        axios.put(`/expense/${id}`,expense,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.errors){
                swal.fire(`${response.data.message}`,"","error")
            }
            else{
            dispatch(editExpense(response.data))
            }
        })
        .catch((err)=>{
            alert(err)
        })
    })

}

export const startRemoveExpense=(id:string)=>{
    return((dipatch:any)=>{
        axios.delete(`/expense/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            dipatch(removeExpense(id))
        })
        .catch((err)=>{
            alert(err)
        })
    })
}