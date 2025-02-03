import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import UsersContainer from './components/Users/UsersContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
        <Routes>
          <Route path="profile/*" element={<ProfileContainer />} />
          <Route path="dialogs/*" element={<DialogsContainer/>} />
          <Route path="users/" element={<UsersContainer /> }/>
          <Route path="news" element={<News />} />
          <Route path="music" element={<Music />} />
          <Route path="settings" element={<Settings/>} />
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
