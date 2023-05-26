import logo from './logo.svg';
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import './App.css';
import LoginScreen from './LoginScreen';
import ResetPasswordScreen from './ResetpasswordScreen';
import Setup1 from './Setup1';
import Setup2 from './Setup2';
import Setup3 from './Setup3';
import CreatTag from './CreateTag';
import { Taglist } from './Taglist';

function App() {
  return (
    <ChakraBaseProvider>
      <Taglist />
    </ChakraBaseProvider>
  );
}

export default App;
