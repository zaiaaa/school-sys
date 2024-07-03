import React, { useContext } from 'react'
import { Header } from '../../components/header/header'
import { Input } from '../../components/input'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup" 
import { AuthContext } from '../../context/auth'
import { CardG } from '../../components/card/card'
import { Alert } from '../../components/alert/alert'
import "./style.css"
import telaLogin from "../../assets/telaLogin.svg"
import { Button } from '../../components/button/button'
import { Link } from 'react-router-dom'


const schema = yup.object({
  rm: yup.string().required('Campo obrigatório').min(6, "Um RM é composto por 6 dígitos.").max(6, "Um RM é composto por 6 dígitos."),
  password: yup.string().required('Campo obrigatório').min(6, "Senha com no mínimo 6 caracteres")
}).required()


//console.log(userLogado)

//TODO estilizar a página de login

const Login = () => {

  const {handleLogin, user} = useContext(AuthContext)

  console.log(user)

  const {
      control,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm({resolver: yupResolver(schema),
      mode: 'onChange',
  })
  

const onSubmit = async (formData) => {
  handleLogin(formData)
  console.log(formData)
}
  
  return (
    <>
        <Header />
        
        <section>
          <CardG>
            <div className='image'>
              <img src={telaLogin} alt="" srcset="" />
            </div>
            <div className="card-login">
              {errors?.password?.message && !errors?.rm?.message? <Alert open={"show"} errorMessage={errors?.password?.message}/> : null}
              {errors?.rm?.message? <Alert open={"show"} errorMessage={errors?.rm?.message}/> : null}
                <h1>Faça Login</h1>
                <p>Veja suas notas, aulas e muito mais!</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input className={"input"} name={"rm"} control={control} placeholder="RM"/>
                    <Input className={"input"} name={"password"} control={control} placeholder="Senha" type="password"/>
                    <Button type={'submit'} text={'Entrar'} variant={'orange'}/>
                </form>
                <Link to={'/cadaster'}>Ainda não tenho uma conta</Link>
            </div>
          </CardG>
        </section>
    </>
  )
}


export {Login}