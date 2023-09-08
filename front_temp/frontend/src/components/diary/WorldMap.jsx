import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { VectorMap } from 'react-jvectormap';
import { useCountriesData } from './CountryContext';
const krdata = require('world_countries_lists/data/countries/ko/countries.json');

const WorldMap = () => {
    const { countriesCodesArray, setCountriesCodesArray } = useCountriesData();
    const [countriesNamesArray, setCountriesNamesArray] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {
        makeMapDataStructure(countriesCodesArray);
    }, [countriesCodesArray]);

    const handleClick = (e, countryCode) => {
        setCountriesCodesArray(prevCodesArray => {
            let newCountryCodesArray;
    
            if (prevCodesArray.includes(countryCode)) {
                // 이미 선택된 국가를 클릭한 경우, 해당 국가 코드를 제거
                newCountryCodesArray = prevCodesArray.filter(code => code !== countryCode);
            } else {
                // 새로운 국가를 선택한 경우, 해당 국가 코드를 추가
                newCountryCodesArray = [...prevCodesArray, countryCode];
            }
    
            getCountriesNamesList(newCountryCodesArray);
            return newCountryCodesArray;
        });
        console.log(countriesCodesArray)
    };
    

    const getCountryNameByCode = countryCode => {
        const lowercaseCountryCode = countryCode.toLowerCase();
        const countryData = krdata.find(data => data.alpha2 === lowercaseCountryCode);
        return countryData ? countryData.name : '';
    };

    const getCountriesNamesList = codesArray => {
        const list = codesArray.map(code => getCountryNameByCode(code));
        setCountriesNamesArray(list);
    };

    const makeMapDataStructure = codesArray => {
        let obj = {};
        codesArray.forEach(countryCode => (obj[countryCode] = 5));
        setData(obj);
    };

    return (
        <S.Wrap style={{ width: 840, height: 336 }}>
            <VectorMap
                map={'world_mill'}
                backgroundColor="transparent"
                containerStyle={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    overflow: 'hidden',
                }}
                containerClassName="map"
                onRegionClick={handleClick}

                regionStyle={{
                    initial: {
                        fill: '#8390FA', //main1
                        'fill-opacity': 0.9,
                        stroke: 'none',
                        'stroke-width': 0,
                        'stroke-opacity': 0,
                    },
                    selected: {
                        fill: '#5452B7',
                    },
                }}
                regionsSelectable={true}
                series={{
                    regions: [
                        {
                            values: data,
                            scale: ["#5452B7"],
                            normalizeFunction: 'polynomial',
                        },
                    ],
                }}
                
            />
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

export default WorldMap;
