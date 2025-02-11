import { combineReducers, configureStore } from '@reduxjs/toolkit'
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
});

const store = configureStore({
  reducer: reducers
});

window.store = store;

export default store;
