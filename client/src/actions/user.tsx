import axios from '../config/axios'
import swal from 'sweetalert2'

export const setUser = (user:{}) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const removeUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}

export const updateUser = (user:any) => {
    return {
        type: 'UPDATE_USER',
        payload:user
    }
}


export const startSetUser=(loginData: any,redirect: () => void)=>{
    return (dispatch:any)=>{
        axios.post('/users/login',loginData,)
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                swal.fire(`${response.data.errors}`,"","error")
            } 
            else {
                swal.fire({title: "LoggedIn!",
                    text: `Successfully LoggedIn!`,
                    icon: "success",
                    timer: 1000
                })
                localStorage.setItem('authToken',response.data.token)
                dispatch(setUser(response.data.user))
                redirect() 
                setTimeout(()=>document.location.reload(),100)
            }
        })
        .catch((err)=>{
            alert(err)
        })

    }
}


export const startAddUser = (registerData: {},redirect: () => void) => {
    return(()=>{
        axios.post('/users/register',registerData)
            .then(response=>{
                if(response.data.errors){
                    swal.fire(`${response.data.errors.message || response.data.errors.errmsg}`,"","error")
                } else {
                    swal.fire({title: "Registered!",
                    text: `Successfully Registered!`,
                    icon: "success",
                    timer: 1000})
                    redirect()
                   
                }
            })
            .catch((err)=>{
                alert(err)
             })
    })

}

export const startRemoveUser = () => {
    return((dispatch:any)=>{
        axios.delete('/users/logout',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                if(response.data.errors){
                    alert(response.data.message)
                } else {
                    localStorage.removeItem('authToken')
                    dispatch(removeUser())
                    window.location.href="/"
                }
            })
    })
}

export const startAddUserImage=(formData:any)=>{
    return((dispatch:any)=>{
        axios({
            method:'post',
            url:'/users/image',
            data:formData,
            headers:{
                'x-auth':localStorage.getItem('authToken'),   
            }
        })
        .then((response)=>{
        dispatch(updateUser(response.data))
        })
        .catch((err)=>{
            alert(err)
        })

    })
}