import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import { useAuth } from './context/AuthContext';

function App() {

  const { status,user, login, logout, register } = useAuth();
    

  useEffect(() => {
    login('admin', 'admin');
  } , []);


  return (
       <div className="App">
         {
            status === 'authenticated' ?
            <div>
              <h1>Welcome {user?.username}</h1>
              <button onClick={logout}>Logout</button>
            </div>
            :
            <div>
              <h1>Welcome {status}</h1>
              <button onClick={() => login('admin', 'admin')}>Login</button>
              <button onClick={() => register('admin', 'admin')}>Register</button>
            </div>
         }
         <h1>asdjkhadshjkdashjk</h1>
         <input type="text" />
         <input type="password" />
      </div>
  );
}

export default App;
