import './App.css';
import { Routes, Route } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import UsersContainer from './components/Users/UsersContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import LoginPage from './Login/Login';
import { Component } from 'react';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader';
import { initialize } from './redux/app-reducer';
import withRouter from './hoc/withRouter';
import { compose } from 'redux';

class App extends Component {
  componentDidMount() {
    this.props.initialize()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
        <Routes>
          <Route path="profile/:userId?" element={<ProfileContainer />} />
          <Route path="dialogs/*" element={<DialogsContainer />} />
          <Route path="users/" element={<UsersContainer />} />
          <Route path="news/" element={<News />} />
          <Route path="music/" element={<Music />} />
          <Route path="settings/" element={<Settings />} />
          <Route path="login/" element={<LoginPage />} />
        </Routes>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  connect(mapStateToProps, {initialize}),
  withRouter)(App);
