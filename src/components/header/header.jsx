import { Link } from 'react-router-dom'
import './style.css'

//TODO caso o usuario esteja logado, esconda e mostre funções que só quem está logado pode fazer


const Header = () => {
    return(
        <div className='navbar'>
            <h2>EduSIS - Luminova</h2>

            <ul>
                <li><Link className='link'>Salas</Link></li>
                <li><Link className='link'>Alunos</Link></li>
                <li><Link className='link' to={'/login'}>Entrar</Link></li>
            </ul>
        </div>
    )
}

export {Header}