import './App.css';
import Header from './components/Header';
import Login from './views/Login';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="innerApp">
        <Login />
      </div>
    </div>
  );
}

export default App;
