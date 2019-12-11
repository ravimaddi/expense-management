import axios from '../config/axios'
import swal from 'sweetalert2'

export const setBudget = (budget:{}) => {
    return {
        type: 'SET_BUDGET',
        payload: budget
    }
}

export const addCategory=(category:any)=>{
    return{
        type:'ADD_CATEGORY',
        payload:category
    }
}

export const setCategory=(category:[])=>{
        return{
            type:'CATEGORY_LIST',
            payload:category
        }
}

export const removeCategory =(id:string)=>{
        return{
            type:"REMOVE_CATEGORY",
            payload:id
        }
}

export const startSetBudget=(budget:{})=>{
    return((dispatch:any)=>{
        axios.post('/budget',budget,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            dispatch(setBudget(response.data))
        })
        .catch((err)=>{
            alert(err)
        })
    })
}

export const startGetBudget=()=>{
    return((dispatch:any)=>{
        axios.get('/budget',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.errors){
                swal.fire(`${response.data.message}`,"","error")
            }
            else{
                dispatch(setBudget(response.data))
            }
        })
        .catch((err)=>{
            swal.fire(`${err}`,"","error")
        })
    })
}

export const startUpdateBudget=(budget:{},id:string)=>{
    return((dispatch:any)=>{
        axios.put(`/budget/${id}`,budget,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.errors){
                swal.fire(`${response.data.message}`,"","error")
            }
            else{
            dispatch(setBudget(response.data))
            }
        })
        .catch((err)=>{
            alert(err)
        })
    })

}

export const startGetCategory=()=>{
    return((dispatch:any)=>{
        axios.get('/category',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.errors){
                swal.fire(`${response.data.message}`,"","error")
            }
            else{
                dispatch(setCategory(response.data))
            }
        })
        .catch((err)=>{
            swal.fire(`${err}`,"","error")
        })
    })
}

export const startAddCategory=(category:{})=>{
    return((dispatch:any)=>{
        axios.post('/category',category,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.errors){
                swal.fire(`${response.data.errors.errmsg}`)
            }
            else{
            dispatch(addCategory(response.data))
            }
        })
        .catch((err)=>{
            alert(err)
        })
    })
}

export const startRemoveCategory=(id:string)=>{
    return((dipatch:any)=>{
        axios.delete(`/category/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            dipatch(removeCategory(id))
        })
        .catch((err)=>{
            alert(err)
        })
    })
}