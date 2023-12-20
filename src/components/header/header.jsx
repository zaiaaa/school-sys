import { Link } from 'react-router-dom'
import './style.css'

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