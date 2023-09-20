import './App.css';
import CircuitBuilderPage from './components/CircuitBuilderPage/CircuitBuilderPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from './components/Header/Header.tsx';
import LoginCreateAccView from './components/LoginCreateAccPage/LoginCreateAccView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Header/>
        </nav>
        <Routes>
            <Route path={``} element={
                <CircuitBuilderPage/>
            }/>
            <Route path = {"/login"} element = {
              <LoginCreateAccView/>
            }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
