import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { VectorMap } from 'react-jvectormap';
import { useCountriesData } from './CountryContext';
const krdata = require('world_countries_lists/data/countries/ko/countries.json');

const WorldMap = () => {
    const { countriesCodesArray, setCountriesCodesArray } = useCountriesData();
    const [countriesNamesArray, setCountriesNamesArray] = useState([]);
    const [hoveredRegionName, setHoveredRegionName] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [data, setData] = useState({});

    useEffect(() => {
        makeMapDataStructure(countriesCodesArray);
    }, [countriesCodesArray]);

    // 국가 무한 생성 억제
    useEffect(() => { return () => { document.querySelectorAll('.jvectormap-tip').forEach((element) => { element.remove(); }); }; });

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
    };

    const handleRegionOver = (event, code) => {
        const countryName = getCountryNameByCode(code);

        // 마우스 위치 계산
        const x = event.pageX;
        const y = event.pageY - 20; // 국가명을 마우스 바로 위에 표시하려면 y 위치에서 20을 뺍니다.

        setHoveredRegionName(countryName);
        setTooltipPosition({ x, y });
    };

    const handleRegionOut = () => {
        setHoveredRegionName('');
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
                onRegionOver={handleRegionOver}
                onRegionOut={handleRegionOut}

                regionStyle={{
                    initial: {
                        fill: '#8390FA',
                        'fill-opacity': 0.9,
                        stroke: 'none',
                        'stroke-width': 0,
                        'stroke-opacity': 0,
                    },
                    selected: {
                        fill: '#5452B7',
                    },
                    hover: {
                        "fill-opacity": 0.8,
                        cursor: "pointer"
                    },
                    selectedHover: {}
                }}
                regionsSelectable={true}

                //********************* */
                regionLabelStyle={{
                    initial: {
                        'font-family': 'Verdana',
                        'font-size': '12',
                        'font-weight': 'bold',
                        cursor: 'default',
                        fill: 'black'
                    },
                    hover: {
                        cursor: 'pointer'
                    },
                    selectedHover: {}
                }}

                // regionLabelShow 옵션을 추가하여 레이블을 활성화
                regionLabelShow={true}
                regionLabelText={(event, code) => getCountryNameByCode(code)}
                //활성화했는데 왜 안 대요
                //*********************


                series={{
                    regions: [
                        {
                            values: data,
                            scale: ["#5452B7"],
                            normalizeFunction: 'polynomial',
                            attribute: 'fill'
                        },
                    ],
                }}
            />
            {/* 추가: hoveredRegionName이 비어있지 않으면 표시 */}
            {hoveredRegionName && (
                <div style={{ position: 'absolute', top: tooltipPosition.y, left: tooltipPosition.x, backgroundColor: 'white', padding: '4px' }}>
                    {hoveredRegionName}
                </div>
            )}
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
