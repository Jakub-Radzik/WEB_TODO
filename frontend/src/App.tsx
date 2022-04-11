import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/Header';
import Login from './views/Login';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';
import Register from './views/Register';
import { useEffect, useState } from 'react';
import AuthenticatedApp from './views/AuthenticatedApp';

function App() {
  const { user, status } = useAuth();
  const [view, setView] = useState<'login' | 'register'>('login');

  return (
    <>
      <div className="App">
        <Header />

        {status === 'unauthenticated' && <div className="innerApp">
        {!user && view==='login' && <Login switchView={()=>setView('register')}/>}
        {!user && view==='register' && <Register switchView={()=>setView('login')} />}
        
        </div>}
        {status === 'authenticated' && <AuthenticatedApp/>}
      </div>
      <ToastContainer
        style={{ top: 110 }}
        containerId="main"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
