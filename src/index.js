import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import Layout from './pages/Layout'
import {store} from './redux_components/store'
import CloseIcon from "@material-ui/icons/Close";
import {IconButton} from '@material-ui/core'
import { SnackbarProvider } from "notistack";
import { createRef } from "react";

const notistackRef = createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <IconButton size="small" onClick={onClickDismiss(key)}>
              <CloseIcon />
            </IconButton>
          )}
        >
        <Layout />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
