import React, { useState } from 'react';
import styled from 'styled-components';
import { VectorMap } from 'react-jvectormap';
const krdata = require('world_countries_lists/data/countries/ko/countries.json');

const WorldMap = () => {
    const [countriesCodesArray, setCountriesCodesArray] = useState([]);
    const [countriesNamesArray, setCountriesNamesArray] = useState([]);
    const [data, setData] = useState({});
    const [title, setTitle] = useState('');
    const [titleSet, setTitleSet] = useState(false);
    // const [color, setColor] = useState('#48aeef');

    // const handleColorChange = color => {
    //     setColor(color.hex);
    // };

    const handleChange = e => {
        setTitle(e.target.value);
    };

    const handleClick = (e, countryCode) => {
        if (!countriesCodesArray.includes(countryCode)) {
            const newArray = [...countriesCodesArray, countryCode];
            setCountriesCodesArray(newArray);
            getCountriesNamesList(newArray);
        }
    };

    const getCountryNameByCode = countryCode => {
        const lowercaseCountryCode = countryCode.toLowerCase();
        const countryData = krdata.find(data => data.alpha2 === lowercaseCountryCode);
        return countryData ? countryData.name : '';
    };

    const getCountriesNamesList = codesArray => {
        const list = codesArray.map(code => getCountryNameByCode(code));
        setCountriesNamesArray(list);
        makeMapDataStructure(codesArray);
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
                        fill: `${({ theme }) => theme.color.main1}`,
                        'fill-opacity': 0.9,
                        stroke: 'none',
                        'stroke-width': 0,
                        'stroke-opacity': 0,
                    },
                    selected: {
                        fill: '#2938bc',
                    },
                }}
                regionsSelectable={true}
                series={{
                    regions: [
                        {
                            values: data,
                            // scale: ['#146804', color],
                            normalizeFunction: 'polynomial',
                        },
                    ],
                }}

            />
            {/* <S.VectorMapContainer>
                <VectorMap
                    map={'world_mill'}
                    backgroundColor="transparent"
                    zoomOnScroll={false}
                    containerStyle={{
                        width: '100%',
                        height: '100%',
                    }}
                    onRegionClick={handleClick}
                    containerClassName="map"
                    regionStyle={{
                        initial: {
                            fill: '#e4e4e4',
                            'fill-opacity': 0.9,
                            stroke: 'none',
                            'stroke-width': 0,
                            'stroke-opacity': 0,
                            // 'width': '100%',
                            // 'height': '100%',
                        },
                        hover: {
                            'fill-opacity': 0.8,
                            cursor: 'pointer',
                        },
                        selected: {
                            fill: '#2938bc',
                        },
                        selectedHover: {},
                    }}
                    regionsSelectable={true}
                    series={{
                        regions: [
                            {
                                values: data,
                                // scale: ['#146804', color],
                                normalizeFunction: 'polynomial',
                            },
                        ],
                    }}
                />
            </S.VectorMapContainer>
            {titleSet ? (
                <h3>{title}</h3>
            ) : (
                <div>
                    <h4>지도 이름 짓기 대회</h4>
                    <p>사실 대회는 아닙니다~ ^^ 님 지도만 이름 지어 보세요</p>
                    <form onSubmit={() => setTitleSet(true)}>
                        <input type="text" onChange={handleChange} />
                    </form>
                </div>
            )}
            <div>
                {countriesNamesArray.map((country, i) => (
                    <div key={i}>{country}</div>
                ))}
            </div> */}
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
    // VectorMapContainer: styled.div`
    //     width: 100%;
    //     height: 100%;
    //     overflow: hidden;
    // `,
};

export default WorldMap;
