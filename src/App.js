

import './style/App.css';
import LoginScreen from './auth/LoginScreen';
import { Provider } from 'react-redux';
function App() {
  return (
  
     <Provider>
       <LoginScreen />
     </Provider>
  );
}

export default App;
