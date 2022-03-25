import { Provider } from "react-redux";
import Routing from "./Router/Routing";
import Login from "./screen/Login";
import SignUp from "./screen/SignUp";
import store from "./store/store";
function App() {
  return (
    <>
    
    <Provider store={store}>
    <Routing />
      </Provider>   
    </>
  )
   
  
}

export default App;
