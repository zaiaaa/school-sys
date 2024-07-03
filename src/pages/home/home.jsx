import { useContext, useEffect, useState } from 'react'
import { Card } from '../../components/card-salas/card'
import { Header } from '../../components/header/header'
import './style.css'
import { api } from "../../services/api";
import { NewsContainer } from '../../components/newsContainer/newsContainer';
import foto from "../../assets/volta as aulas.jpg"
import { Carousel } from '../../components/carousel/carousel';
import { AuthContext } from '../../context/auth';



const Home = () => {
    
    const { user, isAuth } = useContext(AuthContext)

    document.title = 'EduSIS | Home'

    const [room, setRoom] = useState([])
    useEffect(() => {        
        
        const fetchData = async () => {
            try{
                const fetching = await api.get('classRoom')
                const generatedRoom = fetching.data

                setRoom(generatedRoom)
            }catch(e){
                console.log('erro - ', e)
            }
        }
        
        fetchData()
    }, [])
    const title = "Volta às aulas!"
    const txt = `Caros alunos, professores e equipe,

    Com alegria, damos as boas-vindas ao novo ano letivo! Este é o momento de renovar o compromisso com o aprendizado, cultivar a curiosidade e abraçar as oportunidades que surgem.
    
    Alunos, comprometam-se com o estudo, explorem talentos e contribuam para nossa comunidade. Professores, sua paixão e criatividade são fundamentais. Equipe, cada um de vocês molda nosso ambiente especial.
    
    Que este ano seja repleto de conquistas, amizades e descobertas extraordinárias. Estamos juntos nesta jornada emocionante!
    
    Com entusiasmo,
    Direção`


    return(
        <>
        <Header />
        <main>
            {/* <NewsContainer img={foto} title={title} txt={txt}/> */}
            <Carousel />
            <div className='div-section'>     
                {
                    user ? <p>olá {user.email}</p> : ''
                }
                {
                    room.length !== 0 ? room.map(item => {
                            return <Card key={item.id} roomClass={item.name + ' - ' + item.serie + 'º ano'} room={item.id} classe={""}></Card>
                        }) : "tem nada aqui nao"
                }       

                {
                    isAuth ? <h1>está autenticado</h1> : <h1>vish ta nada</h1>
                }
            </div>
        </main>
        </>
    )
}

export {Home}