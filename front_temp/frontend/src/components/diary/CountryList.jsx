import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCountriesData } from './CountryContext';
import * as hooks from 'hooks'
const krdata = require('./countries.json');
// countries.json 지도에는 있으나 krdata에 없는 값 추가 완료. 아래는 추가 내용
// id 1001부터
// alpha2는 I
// name은 N 해석한 값
// {"id": , "alpha2": "", "alpha3":"", "name": ""},


const CountryList = () => {
    const { countriesCodesArray, setCountriesCodesArray } = useCountriesData();
    const [countriesNamesArray, setCountriesNamesArray] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchResultInKrData, setIsSearchResultInKrData] = useState(false); // 초기값을 false로 설정
    const { selectedCountry, setSelectedCountry} = hooks.albumState();

    // 필터링된 국가 이름 배열
    const filteredCountryNames = countriesNamesArray
    .filter(countryName => countryName.toLowerCase().includes(searchQuery.toLowerCase()));

    useEffect(() => {
        // 국가 코드 배열이 변경될 때마다 국가 이름 배열 업데이트
        getCountriesNamesList();
    }, [countriesCodesArray]);


    // 국가 코드를 국가 이름으로 변환하는 함수
    const getCountryNameByCode = countryCode => {
        const lowercaseCountryCode = countryCode.toLowerCase();
        const countryData = krdata.find(data => data.alpha2 === lowercaseCountryCode);
        return countryData ? countryData.name : '';
    };

    // 국가 코드 배열을 국가 이름 배열로 변환하고 정렬 후 상태 업데이트
    const getCountriesNamesList = () => {
        const list = countriesCodesArray.map(code => getCountryNameByCode(code));
        
        // 가나다순으로 정렬
        list.sort((a, b) => a.localeCompare(b));
        
        setCountriesNamesArray(list);
        setSelectedCountry(list);
    };

    useEffect(() => {
        console.log('selectedCountry:', selectedCountry);
    }, [selectedCountry]);

    // 검색어 변경 핸들러
    const handleSearchChange = event => {
        const query = event.target.value;
        setSearchQuery(query);
        const lowercaseQuery = query.toLowerCase();
        
        // 검색어와 일치하는 국가를 krdata에서 찾기
        const countryData = krdata.find(data => data.name.toLowerCase() === lowercaseQuery);

        if (countryData) {
            setIsSearchResultInKrData(true); // 검색 결과가 있는 경우 설정
        } else {
            setIsSearchResultInKrData(false); // 검색 결과가 없는 경우 설정
        }
    };

    // 국가 추가 핸들러
    const handleAddCountry = () => {
        // 검색어와 일치하는 국가를 krdata에서 찾기
        const lowercaseQuery = searchQuery.toLowerCase();
        const countryData = krdata.find(data => data.name.toLowerCase() === lowercaseQuery);

        if (countryData) {
            // 국가 코드를 대문자로 변환하여 추가
            setCountriesCodesArray(prevCodesArray => [...prevCodesArray, countryData.alpha2.toUpperCase()]);
            // 검색어 초기화
            setSearchQuery('');
            setIsSearchResultInKrData(true); // 추가 성공 시 초기화
            console.log('krdata에 잇음');
        } else {
            setIsSearchResultInKrData(false); // 검색 결과가 없을 때 설정
            console.log('krdata에 없음');
        }
    };

    return (
        <S.Wrap style={{ width: 264, height: 648 }}>
                <S.SearchBar
                    type="text"
                    placeholder="국가 검색하기"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    
                />
                <div style={{ margin: '10px 0' }}></div> 


            {/* 검색 결과를 필터링하여 국가 이름 목록을 렌더링 */}
            {filteredCountryNames.map((filteredCountryName, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>{filteredCountryName}</div>
            ))}

            {/* 검색 결과가 없는 경우 메시지 출력 또는 검색 결과가 있는데도 검색 결과가 없는 경우 추가 버튼 출력 */}
            {searchQuery && filteredCountryNames.length === 0 && (
                !isSearchResultInKrData ? (
                    <div>검색 결과가 없습니다. 국가명을 확인해 주세요.</div>
                ) : (
                    <div>
                        {searchQuery} 국가를 추가하시겠습니까?
                        <button onClick={handleAddCountry}>추가</button>
                    </div>
                )
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
        padding: 20px;
        background-color: white;
        border-radius: 32px;
        box-shadow: ${({ theme }) => theme.shadow.card};
        .jvectormap-container {
            width: 100%;
            height: 100%;
        }
    `,
    SearchBar: styled.input`
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;

    
    `
};

export default CountryList;
