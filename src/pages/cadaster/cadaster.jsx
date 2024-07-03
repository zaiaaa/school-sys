import React, { useEffect, useState } from 'react'
import { Header } from '../../components/header/header'
import { CardG } from '../../components/card/card'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup" 
import { Input } from '../../components/input'
import { Button } from '../../components/button/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faSearch } from '@fortawesome/free-solid-svg-icons'
import "./style.css"
import telaLogin from "../../assets/telaLogin.svg"
import { api } from '../../services/api'
import {Alert} from "../../components/alert/alert"
import { Success } from '../../components/success/success'
import { useNavigate } from 'react-router-dom'

const esquema = yup.object({
  rm: yup.string().required('Campo obrigatório').min(6, "Um RM é composto por 6 dígitos.").max(6, "Um RM é composto por 6 dígitos."),
  email: yup.string().email('Precisa ser um email válido.').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório').min(6, "Senha com no mínimo 6 caracteres"),
  confirmPassword: yup.string().required("Campo obrigatório")
}).required()

//TODO fazer o cadastro de alunos (já são estudantes, eles só não têm conta)
const Cadaster = () => {
  const navigate = useNavigate()

  const [students, setStudents] = useState([])
  const [errorRm, setErrorRm] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [able, setAble] = useState(false)
  const [rmOk, setRmOk] = useState(false)
  const [acc, setAcc] = useState([])

  const {
    control,
    handleSubmit,
    //watch pega o valor do input
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({resolver: yupResolver(esquema),
    mode: 'onChange',
})

const onSubmit = async (formData) => {
  api.post('users', {
    "rm": formData.rm,
    "email": formData.email,
    "password": formData.password 
  })

  console.log(formData.rm, formData.email, formData.password)

  navigate('/login')
}

const handleSearchClick = async () => {
  const rmValue = watch('rm')
  if(rmValue.length === 6){
    const haveAcc = await api.get(`users/${rmValue}`)
    const studentsFound = await api.get(`students/${rmValue}`)
    console.log(`students/${rmValue}`)
    console.log(haveAcc)
    setAcc(haveAcc.data)
    setStudents(studentsFound.data)
    setAble(true)
    setRmOk(true)
    
  }else{
    setAble(false)
    setRmOk(false)
  }
}

useEffect(() => {
  if(acc.length > 0){
    setErrorRm("Usuário já cadastrado.")
    setAble(false)
    setRmOk(true)
    setCanSubmit(false)
    setValue('rm', '')
  }
}, [acc])

useEffect(() => {  
    if(students.length === 0){
      setErrorRm("Rm inválido.")
      setCanSubmit(false)
      setValue('rm', '')
      setAble(false)
      setRmOk(true)
      setTimeout(() => {
        setErrorRm('')
      }, 3000);
    }

    if(students.length > 0 && acc.length == 0){
      setSuccess("Aluno encontrado!")
      setCanSubmit(true)
      setAble(true)
      setRmOk(false)
      setTimeout(() => {
        setSuccess('')
      }, 3000);
    }
  }, [students])

const handlePasswordChange = () => {
  setShowPassword(!showPassword)
}


useEffect(() => {
  const IsPasswordValid = () => {
    const senha = watch("password")
    const confPass = watch("confirmPassword")

    if(senha === confPass && (senha && confPass)){
      setSuccess("As senhas combinam.")
      setCanSubmit(true)
      setTimeout(() => {
        setSuccess("")
      }, 3000);
    }else{
      setErrorRm("As senhas não batem")
      setCanSubmit(false)
      setTimeout(() => {
        setErrorRm("")
      }, 1000);
    }
  }
  IsPasswordValid()
}, [watch("confirmPassword")])

  console.log(able)
  
  return (
    <>
    <Header />
    <CardG>
      <img src={telaLogin} id='image'/>
      <div className="card-cadaster">
      {errors?.rm?.message ? <Alert open={"show"} errorMessage={errors?.rm?.message}/> : null}
      {errors?.email?.message ? <Alert open={"show"} errorMessage={errors?.email?.message}/> : null}
      {errors?.password?.message ? <Alert open={"show"} errorMessage={errors?.password?.message}/> : null}
      {errorRm ? <Alert open={"show"} errorMessage={errorRm}/> : null}
      {success ? <Success successMessage={success}/> : null}
        <h1>Novo usuário</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p >Verifique se você é um aluno.</p>
          <div className='isValid'>
            <Input maxLength="6" className="input" name={"rm"} control={control} placeholder="RM" readOnly={!rmOk}></Input>
            <Button type={"button"} variant={"orange"} text={<FontAwesomeIcon icon={faSearch}/>} onClick={handleSearchClick}></Button>
          </div>
          <Input type={"email"} name={"email"} control={control} placeholder="Email" disabled={!able}></Input>
          <div className='ct-password'>
            <Input type={showPassword ? "text" : "password"} name={"password"} control={control} placeholder="Senha" disabled={!able}></Input>
            <Button className="eye" variant={"blue"} onClick={handlePasswordChange} text={<FontAwesomeIcon icon={faEye}/>}></Button>
          </div>
          <Input type={"password"} control={control} name={"confirmPassword"} placeholder="Confirme sua senha" disabled={!able}/>
          <Button type={isValid && canSubmit ? "submit" : "button"} text={"Entrar"} variant={isValid && canSubmit ? "orange" : "disabled"}></Button>
        </form>
      </div>
    </CardG>
    </>
  )
}


export {Cadaster}