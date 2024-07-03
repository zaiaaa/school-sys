import React, { useContext, useEffect, useRef, useState } from 'react'
import { Header } from '../../components/header/header'
import { api } from '../../services/api'
import { AuthContext } from '../../context/auth'
import PixQRCode from '../../components/qrcode/qrcode'
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from '../../services/socket'
import axios from 'axios'

const Payload = () => {
  
  const navigate = useNavigate();
  const {id_class} = useParams();

  const { user, setUser } = useContext(AuthContext)

  const [student, setStudent] = useState({})
  const [wasGenerated, setWasGenerated] = useState(false)
  const [payloadInfo, setPayloadInfo] = useState({})
  
  
  
  useEffect(() => {        
    setUser({
      rm: localStorage.getItem("rm"),
      email: localStorage.getItem("email"),
      expiresIn: localStorage.getItem("expiresIn")
    })

    if(!user){
      navigate('/')
    }

    socket.on("payed", () =>{
      api.put(`student/${user.rm}`, {fk_id_class: id_class})
      navigate('/')
    })
}, [])

const handleCancelP = ()=> {
  if(payloadInfo.data){
    api.put(`cancelar/${payloadInfo.data.id}`, {status : 'cancelled'})
    navigate('/salas')
  }
}

  useEffect(() => {
    const getStudent = async () => {
      if(user && user.rm){
          const fetching = await api.get(`students/${user.rm}`)
          setStudent(fetching.data[0])
      }
  }
  getStudent()
  }, [user])

  useEffect(() => {
    const generatePayLoad = async () => {
      if(!wasGenerated && student.name && user.rm){
        const payload = await api.post("pagar", {
          email: user.email,
          name: student.name,
          cpf: student.cpf
        })

        setPayloadInfo(payload)
        setWasGenerated(true)
      }else if(wasGenerated){
        console.log('ja foi gerado')
      }
    }
    
    if(student && user && student.name && user.rm && !wasGenerated){
      setWasGenerated(false)
      generatePayLoad();
      setWasGenerated(true)
      localStorage.setItem('wasGenerated', 'true');
    }

  }, [student])

  useEffect(() => {
    if(payloadInfo.data){
      socket.emit("payloadGen", "Payload gerado!")
      console.log('payload gerado')
    }

  }, [payloadInfo.data])


  // console.log(user.rm)
  // console.log(student)
  console.log(payloadInfo)
  console.log(wasGenerated)

  
  return (
    <>
    <Header />
    <section>
      <h1>Payload de {student.name}</h1>
      <PixQRCode pixKey={payloadInfo.data ? payloadInfo.data.point_of_interaction.transaction_data.qr_code : ""}/>
      <button onClick={handleCancelP}>Cancelar</button>
    </section>
    </>
  )
}

export {Payload}
