import React, { createContext, useContext, useState, useEffect } from 'react';

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [countriesCodesArray, setCountriesCodesArray] = useState([]);

    // 세션 스토리지에서 상태를 복원합니다.
    useEffect(() => {
        const storedData = sessionStorage.getItem('countriesCodesArray');
        if (storedData) {
            setCountriesCodesArray(JSON.parse(storedData));
        }
    }, []);

    // countriesCodesArray가 변경될 때마다 세션 스토리지에 저장합니다.
    useEffect(() => {
        sessionStorage.setItem('countriesCodesArray', JSON.stringify(countriesCodesArray));
    }, [countriesCodesArray]);

    return (
        <CountryContext.Provider value={{ countriesCodesArray, setCountriesCodesArray }}>
            {children}
        </CountryContext.Provider>
    );
};

export const useCountriesData = () => {
    return useContext(CountryContext);
};
