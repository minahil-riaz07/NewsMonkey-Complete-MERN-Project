import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import { useCountry } from './context/CountryContext';
import Navbar from './components/NavBar';
import News from './components/News';
import Login from './components/Login';
import Register from './components/Register';
import SavedArticles from './components/SavedArticles';
import SearchResults from './components/SearchResults';
import Profile from './components/Profile';

const AppRoutes = ({ progress, setProgress }) => {
  const { country } = useCountry();
  const location = useLocation();

  // Wrapping News in a keyed div forces a full remount whenever country changes.
  // The key combines country + category so switching both country and category
  // always triggers a fresh fetch.
  const newsRoute = (category) => (
    <React.Fragment key={`${country}-${category}`}>
      <News
        setProgress={setProgress}
        country={country}
        category={category}
        pageSize={9}
      />
    </React.Fragment>
  );

  return (
    <>
      <Navbar />
      <LoadingBar
        height={3}
        color="#c0392b"
        progress={progress}
        style={{ zIndex: 9999 }}
      />
      <Routes location={location} key={country}>
        <Route path="/"              element={newsRoute('general')} />
        <Route path="/general"       element={newsRoute('general')} />
        <Route path="/business"      element={newsRoute('business')} />
        <Route path="/entertainment" element={newsRoute('entertainment')} />
        <Route path="/health"        element={newsRoute('health')} />
        <Route path="/science"       element={newsRoute('science')} />
        <Route path="/sports"        element={newsRoute('sports')} />
        <Route path="/technology"    element={newsRoute('technology')} />
        <Route path="/search"        element={<SearchResults setProgress={setProgress} />} />
        <Route path="/saved"         element={<SavedArticles />} />
        <Route path="/login"         element={<Login />} />
        <Route path="/register"      element={<Register />} />
        <Route path="/profile"       element={<Profile />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
