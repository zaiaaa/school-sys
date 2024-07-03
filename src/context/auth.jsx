import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {api} from "../services/api"

//TODO encriptar a senha e mandar pro banco
//TODO ter um usuario adm.


export const AuthContext = createContext({})

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()


    useEffect(() => {
        const rm = localStorage.getItem("rm")

        if(rm){
            setIsAuth(true)

            setUser({
                rm: rm,
                email: localStorage.getItem("email"),
                expiresIn: localStorage.getItem("expiresIn")
            })
        }

        setLoading(false)
    }, [])



    const handleLogin = async (loginData) => {
        try{
            const {data} = await api.get(`logUser?rm=${loginData.rm}&password=${loginData.password}`, {
                headers: {
                  'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
                }
              })
              
            if(data && data.rm){
                console.log(data.rm)
                localStorage.setItem("rm", data.rm)
                localStorage.setItem("email", data.email)
                localStorage.setItem("expiresIn", data.exp)
                
                setUser({
                    rm: localStorage.getItem("rm"),
                    email: localStorage.getItem("email"),
                    expiresIn: localStorage.getItem("expiresIn")
                })
                setIsAuth(true)
                console.log(user)
                navigate('/')
            }else{
                alert('email ou senha inválidos')
                setUser({})
                setIsAuth(false)
            }
        }catch(e){
            alert('Login errado', e)
        }
    }

    const logoff = () => {
        localStorage.clear()
        setTimeout(() => {
            setUser({});
            setIsAuth(false)
          }, 0);
    }


    return (<AuthContext.Provider value={{user, handleLogin, logoff, isAuth, loading}}>
        {children}
       </AuthContext.Provider>)
}
