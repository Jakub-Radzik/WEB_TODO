import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/Header';
import Login from './views/Login';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="innerApp">
        <Login />
        <ToastContainer
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
      </div>
    </div>
  );
}

export default App;
