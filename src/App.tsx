import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";


function App() {
 
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
