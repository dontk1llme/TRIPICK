import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MapMap from 'react-svg-worldmap';
import { useCountriesData } from './CountryContext';
const krdata = require('world_countries_lists/data/countries/ko/countries.json');

const WorldMap = () => {
    const { countriesCodesArray, setCountriesCodesArray } = useCountriesData();
    const [countriesNamesArray, setCountriesNamesArray] = useState([]);
    const [data, setData] = useState([]); // data 배열을 useState로 관리

    useEffect(() => {
        // countriesCodesArray가 변경될 때마다 getCountriesData 함수 호출
        getCountriesData(countriesCodesArray);
    }, [countriesCodesArray]);

    const getCountryLowerCode = countryCode => {
        const lowercaseCountryCode = countryCode.toLowerCase();
        return lowercaseCountryCode;
    }

    const getCountryNameByCode = countryCode => {
        const lowercaseCountryCode = countryCode.toLowerCase();
        const countryData = krdata.find(data => data.alpha2 === lowercaseCountryCode);
        return countryData ? countryData.name : '';
    };

    const getCountriesData = codesArray => {
        const newData = codesArray.map(code => ({
            country: getCountryLowerCode(code),
            value: ', '+ getCountryNameByCode(code), // 또는 다른 원하는 값으로 설정
        }));
        setData(newData); // data 배열 업데이트
        
        getCountriesNamesList(codesArray);
    };

    const getCountriesNamesList = codesArray => {
        const list = codesArray.map(code => getCountryNameByCode(code));
        setCountriesNamesArray(list);
    };

    const getStyle = ({ countryValue, countryCode, minValue, maxValue, }) => ({
        fill: countriesCodesArray.includes(countryCode) ? "#5452B7" : "#8390FA",
        stroke: "5452B7",
        strokeWidth: 2,
        // cursor: "pointer",
      });
      
    return (
        <S.Wrap style={{ width: 840, height: 336 }}>
            <MapMap
                color="#8390FA"
                value-suffix="people"
                data={data} // 업데이트된 data 배열 사용
                size={445}
                richInteraction='true'
                frame
                styleFunction={getStyle}
            >
            </MapMap>
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
    `,
};

export default WorldMap;
