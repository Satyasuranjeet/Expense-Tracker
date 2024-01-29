import { BrowserRouter,Routes,Route} from "react-router-dom";
import A from "./components/Auth/A";
import Home from "./components/Home/Home";
const App = () => {
  return (
    <BrowserRouter>
    <main>
      <Routes>
        <Route path="/" element={<A/>} />
        <Route path="/Home" element={<Home/> } />
      </Routes>
    </main>
    </BrowserRouter>  
  );
};

export default App;
