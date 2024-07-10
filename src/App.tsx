import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';

import store, { AppStateType } from './redux/redux-store';
import { initializeApp } from './redux/app-reducer';

import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

import LoginPage from './components/Login/Login';
import Preloader from './components/common/preloader/preloader';
import UsersPage from './components/Users/UsersPage';

import './App.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';
import { Footer } from 'antd/lib/layout/layout';

import Header from './components/Header/Header';
import { ChatPage } from './pages/chat/ChatPage';
const { Sider, Content } = Layout;
type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};
class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    if (!this.props.initialized) {
      return (
        <div className="app-wrapper">
          <Preloader />
        </div>
      );
    }

    return (
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px', overflow: 'initial' }}>
          <Layout
            className="site-layout-background"
            style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Navbar />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/profile" />
                </Route>
                <Route path="/dialogs" render={() => <DialogsContainer />} />
                <Route
                  path="/profile/:userId?"
                  render={() => <ProfileContainer />}
                />
                <Route path="/users" render={() => <UsersPage />} />
                <Route path="/chat" render={() => <ChatPage />} />
                <Route path="/login" render={() => <LoginPage />} />
                <Route path="*" render={() => <div>404</div>} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Vitaly developer ©2020</Footer>
      </Layout>
    );
  }
}
let mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
  };
};
const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }),
)(App);
const SocialApp: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default SocialApp;
