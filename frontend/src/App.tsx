import { ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/Header';
import Login from './views/Login';
import 'react-toastify/dist/ReactToastify.css';
import Register from './views/Register';
import AuthenticatedApp from './views/AuthenticatedApp';
import { Route, Routes, Navigate } from 'react-router-dom';
import { GoogleAuthenticationHelper } from './views/GoogleAuthenticationHelper';
import PATH from './utils/router/paths';
function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path={PATH.HOME} element={<Navigate to={PATH.LOGIN} />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.REGISTER} element={<Register />} />
          <Route path={PATH.APP} element={<AuthenticatedApp />} />
          <Route
            path={PATH.GOOGLE_AUTH}
            element={<GoogleAuthenticationHelper />}
          />
        </Routes>
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
