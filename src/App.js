import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import UsersContainer from './components/Users/UsersContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import LoginPage from './Login/Login';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
        <Routes>
          <Route path="profile/:userId?" element={<ProfileContainer />} />
          <Route path="dialogs/*" element={<DialogsContainer/>} />
          <Route path="users/" element={<UsersContainer /> }/>
          <Route path="news/" element={<News />} />
          <Route path="music/" element={<Music />} />
          <Route path="settings/" element={<Settings/>} />
          <Route path="login/" element={<LoginPage />}/>
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
