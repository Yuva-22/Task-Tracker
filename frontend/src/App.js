import './App.css';
import Home from './pages/home/home';
import Login from './pages/login/login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './pages/register/register';
import Admin from './pages/admin/admin';
import User from './pages/user/user';
import Addtask from './pages/addtask/addtask';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

        <Route path="/">

          <Route index element = {<Home />} />
          <Route path="login" element = {<Login/>} />
          <Route path="register" element = {<Register />} />
          <Route path="admin" element = {<Admin />} />
          <Route path="user/:stuid" element = {<User />} />
          <Route path="addtask" element={<Addtask />} />

        </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
