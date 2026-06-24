import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CountryProvider } from './context/CountryContext';

import AppRoutes from './AppRoutes';
import './App.css';

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
                toastStyle={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                }}
              />
            </Router>
          </CountryProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}