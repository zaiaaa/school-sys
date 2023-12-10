import './global.css';

import {
  BrowserRouter as Router,
  Route,
  Routes, 
  Link
} from 'react-router-dom'
import { Home } from './pages/home/home';


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
