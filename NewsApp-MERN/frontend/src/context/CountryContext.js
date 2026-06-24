import React, { createContext, useState, useContext } from 'react';

// NewsAPI supported country codes: https://newsapi.org/docs/endpoints/top-headlines
// Palestine (ps) is NOT supported by NewsAPI — we use a keyword-search fallback for it.
// useSearch: true  →  backend will use /everything?q=<searchQuery> instead of top-headlines
export const COUNTRIES = [
  { code: 'us', name: 'United States',  flag: '🇺🇸', useSearch: false },
  { code: 'pk', name: 'Pakistan',       flag: '🇵🇰', useSearch: false },
  { code: 'in', name: 'India',          flag: '🇮🇳', useSearch: false },
  { code: 'ps', name: 'Palestine',      flag: '🇵🇸', useSearch: true,  searchQuery: 'Palestine news' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', useSearch: false },
  { code: 'au', name: 'Australia',      flag: '🇦🇺', useSearch: false },
  { code: 'ca', name: 'Canada',         flag: '🇨🇦', useSearch: false },
  { code: 'de', name: 'Germany',        flag: '🇩🇪', useSearch: false },
  { code: 'fr', name: 'France',         flag: '🇫🇷', useSearch: false },
  { code: 'ae', name: 'UAE',            flag: '🇦🇪', useSearch: false },
];

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState(
    () => localStorage.getItem('nm_country') || 'us'
  );

  const changeCountry = (code) => {
    setCountry(code);
    localStorage.setItem('nm_country', code);
  };

  const currentCountry = COUNTRIES.find((c) => c.code === country) || COUNTRIES[0];

  return (
    <CountryContext.Provider value={{ country, currentCountry, changeCountry, COUNTRIES }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
