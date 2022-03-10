import React, {createContext, useState, useEffect} from 'react';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI'
import axios from 'axios';


export const GlobalState = createContext()

export const DataProvider = ({children}) => {
     const [token, setToken] = useState(false)
     
     useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    // const refreshToken = async () =>{
    //     const res = await axios.get('https://ecommerce1-back.herokuapp.com/user/refresh_token')
    //     console.log(res)
    //     setToken(res.data.accesstoken)
    // }

    // useEffect(() =>{
    //     const firstLogin = localStorage.getItem('firstLogin')
    //     if(firstLogin) refreshToken()
    // },[])

     const state = {
         token: [token, setToken],
         ProductsAPI: ProductsAPI(),
         userAPI: UserAPI(token)
     }

    return (
        <GlobalState.Provider value={state}>
        {children}
        </GlobalState.Provider>
    )
}
