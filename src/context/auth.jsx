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
                  'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR3VzdGF2byIsImVtYWlsIjoiMDAwMDAwIiwiaWF0IjoxNzAzNzQ1MTE5fQ.NNv2OCzOuobuCBDiEbe7s-f60YyQtlxVdBUpM9Ri2Jc`
                }
              })
            console.log("resposta: ", data)
            if(data && data.length > 0){
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
