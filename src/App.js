import './App.css';
import CircuitBuilderPage from './components/CircuitBuilderPage/CircuitBuilderPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from './components/Header/Header.tsx';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
