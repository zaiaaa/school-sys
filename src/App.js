import './global.css';

import {
  BrowserRouter as Router,
  Route,
  Routes, 
  Link
} from 'react-router-dom'
import { Home } from './pages/home/home';

import { AuthContextProvider } from './context/auth';

// Importe os pacotes necessários
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Login } from './pages/login/login';
import { Cadaster } from './pages/cadaster/cadaster';
//import { fab } from '@fortawesome/free-brands-svg-icons';

// Adicione os ícones ao library
library.add(faChevronUp, faChevronDown);



function App() {
  return (
    <div className="App">
       <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}/>
            <Route path='/cadaster' element={<Cadaster />}/>
          </Routes>
        </AuthContextProvider>
       </Router>
    </div>
  );
}

export default App;
