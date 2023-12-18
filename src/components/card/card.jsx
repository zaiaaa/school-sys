import "./style.css"
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { api } from "../../services/api";


const Card = ({roomClass, room = [],}) => {
  
    const [students, setStudents] = useState([])

    const [showDetails, setShowDetails] = useState(false)

    const handleCardClick = () => {
        setShowDetails(true)

        if(showDetails === true){
            setShowDetails(false)
        }
    }
    
    useEffect(() => {
        const fetchData = async (room) =>{
            try{ 
            const fetching = await api.get(`studentsPerRoom/${room}`)
            const student = fetching.data

            setStudents(student)
            }catch(e){
                console.error('erro - ', e)
            }
        }
        
        fetchData(room)

    }, [room])

    
    console.log(showDetails)
    console.log(students)

    return (   
    
    !showDetails ? (
        <div className={"card"} onClick={handleCardClick}>
            <div className="header">
                <h2>{roomClass}</h2><span><FontAwesomeIcon icon={faChevronDown}/></span>
            </div>
            <div className="details">  
            </div>
        </div>
    ) : <div className={"card open"} onClick={handleCardClick}>
            <div className="header">
                <h2>{roomClass}</h2><span><FontAwesomeIcon icon={faChevronDown}/></span>
            </div>
            <div className="details">          
                {
                    students.length === 0 ? (
                        <ul className="student">
                            <li>Esta sala não possui alunos matriculados.</li>
                        </ul>
                    
                    ) : <ul className="student">
                        {
                            students.map(item => {
                                return <li key={item.rm}>{item.name} - RM: {item.rm}</li>
                            }) 
                        }
                </ul>

                }
            </div>
        </div>



  )
}


export {Card}