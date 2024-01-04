import { Link } from 'react-router-dom'
import './style.css'
import { AuthContext } from '../../context/auth'; 
import { useContext, useEffect, useRef, useState } from 'react';
import { api } from '../../services/api';
import { Dropdown } from '../dropdown/dropdown';
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



//TODO caso o usuario esteja logado, esconda e mostre funções que só quem está logado pode fazer


const Header = () => {
    const [student, setStudent] = useState('')
    const {user, logoff} = useContext(AuthContext)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [name, setName] = useState('')


    console.log(user)

    useEffect(() => {
        const getStudent = async () => {
            try {
                console.log(user.rm); // Certifique-se de que user.rm é uma propriedade válida
                if(user && user.rm){
                    const aluno = await api.get(`students/${user.rm}`);  // Certifique-se de que a chamada à API está configurada corretamente
                    setStudent(aluno);
                }
              } catch (error) {
                console.error('Erro ao buscar informações do estudante:', error);
              }
        }   
        getStudent()
    }, [user])


    useEffect(() => {     
        if(student && student.data && student.data[0]){
            const nome = student.data[0].name
            const partes = nome.split(" ")
            setName(partes[0])
        }
    }, [student])
    

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

    return(
        <div className='navbar'>
            <Link to={'/'}>EduSIS - Luminova</Link>

            <ul>
                <li><Link className='link'>Salas</Link></li>
                <li><Link className='link'>Alunos</Link></li>
                
                {!user.rm ?( <li><Link className='link' to={'/login'}>Entrar</Link></li> 
                ): (<li className='link' onClick={toggleDropdown}>
                    Bem vindo de volta, {name}
                    </li>                    
                )}
                {isDropdownOpen && (
                    <Dropdown children={
                    <>
                        <li className="dropdown-li"><FontAwesomeIcon icon={faUser}/> Sua conta</li>
                        <li onClick={() => { logoff(); setIsDropdownOpen(false) }} className="dropdown-li"><FontAwesomeIcon icon={faRightFromBracket}/> Sair</li>
                    </>
                }/>
                )}


            </ul>
        </div>
    )
}

export {Header}