import './App.css';
import CircuitBuilderPage from './components/CircuitBuilderPage/CircuitBuilderPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from './components/Header/Header.js';
import LoginCreateAccView from './components/LoginCreateAccPage/LoginCreateAccView';
import About from './components/AboutPage/About.tsx'; 
import Setup from './components/SetupPage/Setup.tsx';

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
            <Route path = {"/about"} element = {
              <About/>
            }/>
            <Route path = {"/setup"} element = {
              <Setup/>
            }/>
            <Route path = {"/circuitBuilder"} element = {
              <CircuitBuilderPage/>
            }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
