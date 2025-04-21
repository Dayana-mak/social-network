import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from "./redux/redux-store"
import App from './App';
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import theme from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

const container = document.getElementById('root');

if (!container) {
  throw new Error("Root container not found");
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);



