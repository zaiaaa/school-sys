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
            console.log(data)
            if(data.length === 1){
                setUser(data[0])
                navigate('/')
            }else{
                alert('email ou senha inválidos')
            }
        }catch(e){
            alert('erro -> ', e)
        }
    }


    return (<AuthContext.Provider value={{user, handleLogin}}>
        {children}
       </AuthContext.Provider>)
}
