import React, { createContext, useContext, useState, useEffect } from 'react';

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [countriesCodesArray, setCountriesCodesArray] = useState([]);

    return (
        <CountryContext.Provider value={{ countriesCodesArray, setCountriesCodesArray }}>
            {children}
        </CountryContext.Provider>
    );
};

export const useCountriesData = () => {
    return useContext(CountryContext);
};
