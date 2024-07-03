import { Header } from "../../components/header/header"
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth"
import { api } from "../../services/api"
import "./style.css"
import {CardG} from "../../components/card/card"
import {Button} from "../../components/button/button"
import { useNavigate } from "react-router-dom"



const Salas = () => {
    const navigate = useNavigate()
    const { user, isAuth } = useContext(AuthContext)
    const [myRoom, setMyRoom] = useState('')
    const [roomChange, setRoomChange] = useState([])

    document.title = 'EduSIS | Salas'

    useEffect(() => {
        const getStudent = async () => {
            if(user && user.rm){
                const fetching = await api.get(`students/${user.rm}`)
                console.log(fetching)
                const getClass = await api.get(`classRoom/id/${fetching.data[0].fk_id_class}`)
                setMyRoom(`${getClass.data[0].name} - ${getClass.data[0].serie}º Serie`)
            }
        }
        getStudent()
    }, [user])

    useEffect(() => {
        const getRooms = async () => {
            const fetching = await api.get("classRoom")

            setRoomChange(fetching.data)
        }

        getRooms()
    }, [])
    console.log(roomChange)

    return (
    <>
    <Header />
        <section>
            <h1 align="Center">Salas</h1>
            <p>Sua sala é {myRoom}</p>

            {
                roomChange !== 0 ? roomChange.map(item => {
                    return <CardG className={"card-salas"} key={item.id}><h3>Quero mudar para {item.name} - {item.serie}º Ano</h3> <br /> <Button variant={"orange"} text={"Mudar!"} onClick={() => navigate(`/payload/${item.id}`)} /></CardG>
                }) : "Não há salas com vaga."
            }
        </section>
    </>
    )
}

export {Salas}

//TODO por uma opção pra troca de sala, e mostrar as salas que tem vaga (habilitar o pagamento para isso [e a proxima troca só poderá ser feita depois de 4 dias])