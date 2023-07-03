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
import { Clocks } from './Tagdetails';
import {Taglist} from './Taglist'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorBoundary from './ErrorBoundary';

const router = createBrowserRouter([
  {
    path: "/",
    element:(
      <ErrorBoundary>
         <App />
      </ErrorBoundary>
    ),
  },
  {
    path: "/login",
    element:(
      <ErrorBoundary>
         <LoginScreen />
      </ErrorBoundary>
    ),
  },
  {
    path: "/taglist",
    element: (
      <ErrorBoundary>
        <Taglist />
      </ErrorBoundary>
    ),
  },
  {
    path: "/tagdetails/:tag_id",
    element: (
      <ErrorBoundary>
        <Clocks />
      </ErrorBoundary>
    ),
  },
  {
    path: "/create-tag",
    element: (
      <ErrorBoundary>
        <CreateTag />
      </ErrorBoundary>
    ),
  },
  {
    path: "/register",
    element: (<ErrorBoundary>
      <RegistrationForm />
    </ErrorBoundary>),
  },
  {
    path: "/reset-password",
    element: (<ErrorBoundary>
      <ResetPasswordScreen />
    </ErrorBoundary>),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraBaseProvider theme={DataboardTheme}>
  <RouterProvider router={router}/>
  </ChakraBaseProvider>
);

reportWebVitals();
