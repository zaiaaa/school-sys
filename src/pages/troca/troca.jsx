import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

const Troca = () => {
  const {rm} = useParams();
  const {logoff} = useContext(AuthContext)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [newPassword, setNewPassword] = useState("")


  const handleClickSubmit = async () => {
    alert('enviou a PORRA do formulário')
    try{
      await api.put(`/users/alt/${rm}`, {
        password: newPassword
      })
      setPasswordChanged(true)
      alert('Senha alterada com sucesso! retorne a tela de login')
    }catch(e){
      alert(e)
    }
  }

   return (
    <>
    <div>Troca de senha do {rm}</div>

    <form onSubmit={handleClickSubmit}>
      <input type="text" name="senhaNova" id="" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Trocar a senha</button>
    </form>

    {passwordChanged === true ?
     <Link to={'/login'}>Volte a tela de login</Link>
     :
     
     ""}
    
    </>
  )
}

export {Troca}