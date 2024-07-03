import React, { useContext } from 'react'
import { api } from '../../services/api'
import { AuthContext } from '../../context/auth'

const Conta = () => {
    const { user } = useContext(AuthContext)

    const handleClickChangePass = async () => {
        try{
            await api.get(`/changePass/${localStorage.getItem('rm')}`)
            alert('foi enviado pro seu email um email pra vc trocar de senha, checa la!')
        }catch(e){
            alert('nao foi possivel pedir alteração de senha pro seu email.')
        }
    }
  
  
  return (
    <button onClick={handleClickChangePass}>Solicitar troca de senha</button>
  )
}

export {Conta}