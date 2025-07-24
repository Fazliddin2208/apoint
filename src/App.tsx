import {BrowserRouter} from "react-router-dom";
import {ROUTES} from "./routes/routes";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <ROUTES />
      </BrowserRouter>
    </>
  );
}

export default App;
