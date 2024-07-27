// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { DataboardTheme } from './style/theme';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorBoundary from './ErrorBoundary';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraBaseProvider theme={DataboardTheme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
);

reportWebVitals();
