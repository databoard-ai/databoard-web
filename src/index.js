import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraBaseProvider } from '@chakra-ui/react'
import { DataboardTheme } from './style/theme';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginScreen from './LoginScreen';
import ResetPasswordScreen from './ResetpasswordScreen';
import RegistrationForm from './RegistrationForm';
import CreateTag from './CreateTag';
import { Tagdetails } from './Tagdetails';
import {Taglist} from './Taglist'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/taglist",
    element: <Taglist />,
  },
  {
    path: "/tagdetails",
    element: <Tagdetails />,
  },
  {
    path: "/create-tag",
    element: <CreateTag />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordScreen />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <ChakraBaseProvider theme={DataboardTheme}>
  <RouterProvider router={router}/>
  </ChakraBaseProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
