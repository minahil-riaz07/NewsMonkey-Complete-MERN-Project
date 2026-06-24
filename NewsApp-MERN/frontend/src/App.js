import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CountryProvider } from './context/CountryContext';
import Navbar from './components/NavBar';
import News from './components/News';
import Login from './components/Login';
import Register from './components/Register';
import SavedArticles from './components/SavedArticles';
import SearchResults from './components/SearchResults';
import Profile from './components/Profile';
import './App.css';

// Inner component that can consume CountryContext
import AppRoutes from './AppRoutes';

export default class App extends Component {
  state = { progress: 0 };
  setProgress = (progress) => this.setState({ progress });

  render() {
    return (
      <ThemeProvider>
        <AuthProvider>
          <CountryProvider>
            <Router>
              <AppRoutes
                progress={this.state.progress}
                setProgress={this.setProgress}
              />
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                toastStyle={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
              />
            </Router>
          </CountryProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}
