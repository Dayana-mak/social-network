import { combineReducers, configureStore } from '@reduxjs/toolkit'
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer
});

const store = configureStore({
  reducer: reducers
});

export default store;
