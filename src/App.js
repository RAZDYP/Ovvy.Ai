import logo from './logo.svg';
import './App.css';
import Navbaar from './components/Navbaar';
import CreateToken from './components/CreateToken';
import HaveToken from './components/HaveToken';
import TokenTab from './components/TokenTab';

// bootstrap import
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <Navbaar />
      <div class="container col-md-9">
        <div class="card w-100 shadow">
          <TokenTab />
          <div class="card">
            <div class="formbold-main-wrapper">
              <div class="">
                <CreateToken />
                <HaveToken />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
