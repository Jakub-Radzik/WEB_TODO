import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/Header';
import Login from './views/Login';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <>
      <div className="App">
        <Header />

        <div className="innerApp">{!user && <Login />}</div>
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
