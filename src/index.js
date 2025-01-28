import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from "./redux/redux-store"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App store={store} /* state={state} dispatch={store.dispatch.bind(store)} *//>
    </React.StrictMode>
  );
} 

rerenderEntireTree(store.getState());

store.subscribe(() => rerenderEntireTree(store.getState()));
