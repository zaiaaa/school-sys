import React, { useContext } from 'react'
import { Header } from '../../components/header/header'
import { Input } from '../../components/input'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup" 
import { AuthContext } from '../../context/auth'



const schema = yup.object({
  rm: yup.string().required('Campo obrigatório').min(6, "Um RM é composto por 6 dígitos.").max(6, "Um RM é composto por 6 dígitos."),
  password: yup.string().required('Campo obrigatório').min(3, "No mínimo 6 caracteres")
}).required()


//TODO estilizar a página de login


const Login = () => {
  

  
  const {handleLogin} = useContext(AuthContext)

  const {
      control,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm({resolver: yupResolver(schema),
      mode: 'onChange',
  })
  

const onSubmit = async (formData) => {
  handleLogin(formData)
}
  
  return (
    <>
        <Header />
        
        <section>
            <div className="card-login">
                <h2>Faça Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input name={"rm"} errorMessage={errors?.rm?.message} control={control} placeholder="RM"/>
                    <Input name={"password"} errorMessage={errors?.password?.message} control={control} placeholder="Senha" type="password"/>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </section>
    </>
  )
}


export {Login}