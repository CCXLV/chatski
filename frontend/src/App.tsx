import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Home from './components/Home/Home';
import "./styles.css";


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/register' element={<Register />}/>
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;