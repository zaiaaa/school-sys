import './global.css';

import {
  BrowserRouter as Router,
  Route,
  Routes, 
  Link
} from 'react-router-dom'
import { Home } from './pages/home/home';

// Importe os pacotes necessários
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
//import { fab } from '@fortawesome/free-brands-svg-icons';

// Adicione os ícones ao library
library.add(faChevronUp, faChevronDown);



function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
       </Router>
    </div>
  );
}

export default App;
