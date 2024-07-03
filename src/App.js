import './global.css';

import {
  BrowserRouter as Router,
  Route,
  Routes, 
  Link
} from 'react-router-dom'
import { Home } from './pages/home/home';

import { AuthContext, AuthContextProvider } from './context/auth';

// Importe os pacotes necessários
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Login } from './pages/login/login';
import { Cadaster } from './pages/cadaster/cadaster';
import { Payload } from './pages/payload/payload';
import { Salas } from './pages/salas/salas';
import {PrivateRoute} from './services/privateRoute';
import { useContext } from 'react';
import { Conta } from './pages/conta/conta';
import { Troca } from './pages/troca/troca';
library.add(faChevronUp, faChevronDown); 


function App() {

  //const {isAuth} = useContext(AuthContext)

  return (
    <div className="App">
       <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/cadaster' element={<Cadaster />}/>
            <Route path='/salas' element={<PrivateRoute><Salas /></PrivateRoute>}/>
            <Route path='/conta' element={<Conta />}/>
            <Route path='/trocadesenha/:rm' element={<Troca />}/>
            <Route path='/payload/:id_class' element={<Payload />}/>
          </Routes>
        </AuthContextProvider>
       </Router>
    </div>
  );
}

export default App;
