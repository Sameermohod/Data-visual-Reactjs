import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import contactsReducer from './store/contacts';
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from 'react-router-dom';


const store = createStore(contactsReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>

  <ThemeProvider>

  <Provider store={store} >
    <App />
  </Provider>
  </ThemeProvider>
  </BrowserRouter>
  </React.StrictMode>
);


