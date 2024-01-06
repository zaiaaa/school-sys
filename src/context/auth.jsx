import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {api} from "../services/api"

//TODO encriptar a senha e mandar pro banco
//TODO ter um usuario adm.


export const AuthContext = createContext({})

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})

    const navigate = useNavigate()

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

                console.log(user)
                navigate('/')
            }else if(data.length == 0){
                alert('email ou senha inválidos')
                setUser({})
            }
        }catch(e){
            alert('Login errado', e)
        }
    }

    const logoff = () => {
        localStorage.clear()
        setTimeout(() => {
            setUser({});
          }, 0);
    }


    return (<AuthContext.Provider value={{user, setUser, handleLogin, logoff}}>
        {children}
       </AuthContext.Provider>)
}
