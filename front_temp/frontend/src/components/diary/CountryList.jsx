import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCountriesData } from './CountryContext';
const krdata = require('world_countries_lists/data/countries/ko/countries.json');

const CountryList = () => {
    const { countriesCodesArray, setCountriesCodesArray } = useCountriesData();
    const [countriesNamesArray, setCountriesNamesArray] = useState([]);

    useEffect(() => {
        // 국가 코드 배열이 변경될 때마다 국가 이름 배열 업데이트
        console.log('실행')
        getCountriesNamesList();
        console.log(countriesNamesArray)
    }, [countriesCodesArray]);

    // 국가 코드를 국가 이름으로 변환하는 함수
    const getCountryNameByCode = countryCode => {
        const lowercaseCountryCode = countryCode.toLowerCase();
        const countryData = krdata.find(data => data.alpha2 === lowercaseCountryCode);
        return countryData ? countryData.name : '';
    };

    // 국가 코드 배열을 국가 이름 배열로 변환하고 상태 업데이트
    const getCountriesNamesList = () => {
        const list = countriesCodesArray.map(code => getCountryNameByCode(code));
        setCountriesNamesArray(list);
    };

    return (
        <S.Wrap style={{ width: 264, height: 648 }}>
            {/* countriesNamesArray를 사용하여 국가 이름 목록을 렌더링 */}
            {countriesNamesArray.map((countryName, index) => (
                <div key={index}>{countryName}</div>
            ))}
        </S.Wrap>
    );
};

const S = {
    Wrap: styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 840px;
        height: 336px;
        margin: 0 12px 12px 0;
        background-color: white;
        border-radius: 32px;
        box-shadow: ${({ theme }) => theme.shadow.card};
        .jvectormap-container {
            width: 100%;
            height: 100%;
        }
    `,
};

export default CountryList;
