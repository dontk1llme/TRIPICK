import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCountriesData } from './CountryContext';
import { IoAdd,  } from 'react-icons/io5';
import * as hooks from 'hooks';
import * as api from 'api';
const krdata = require('./countries.json');
// countries.json 지도에는 있으나 krdata에 없는 값 추가 완료. 아래는 추가 내용
// id 1001부터
// alpha2는 I
// name은 N 해석한 값
// {"id": , "alpha2": "", "alpha3":"", "name": ""},

const CountryList = () => {
    const { countriesCodesArray, setCountriesCodesArray } = useCountriesData();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchResultInKrData, setIsSearchResultInKrData] = useState(false); // 초기값을 false로 설정
    const { selectedCountry, setSelectedCountry, currentCountry, setCurrentCountry, setAlbumList } = hooks.albumState();
    const { memberId } = hooks.loginUserState();

    // 필터링된 국가 이름 배열
    const filteredCountryNames = Array.isArray(selectedCountry)
    ? selectedCountry.filter(countryName =>
          countryName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

    useEffect(() => {
        // 국가 코드 배열이 변경될 때마다 국가 이름 배열 업데이트
        getCountryCodeList();
        setCurrentCountry('');
    }, [selectedCountry]);

    // 국가 이름을 국가 코드로 변환하는 함수
    const getCountryCodeByName = countryName => {
        const countryData = krdata.find(data => data.name === countryName);
        return countryData ? countryData.alpha2.toUpperCase() : '';
    }

    // 국가 이름 배열을 국가 코드 배열로 변환하고 상태 업데이트
    const getCountryCodeList = () => {
        const list = selectedCountry.map(name => getCountryCodeByName(name));
        if(list.lenght !== 0){
            setCountriesCodesArray(list);
        }
    }

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
            console.log(countryData);
            console.log(countriesCodesArray);
            console.log(selectedCountry);
            // setCountriesCodesArray([...countriesCodesArray, countryData.alpha2.toUpperCase()]);
            setSelectedCountry([...selectedCountry, countryData.name])
        
            // 검색어 초기화
            setSearchQuery('');
            setIsSearchResultInKrData(true); // 추가 성공 시 초기화
            console.log('krdata에 잇음');
            console.log(countriesCodesArray);
        } else {
            setIsSearchResultInKrData(false); // 검색 결과가 없을 때 설정
            console.log('krdata에 없음');
        }
    };

    const handleSelectCountry = countryName => {
        if (currentCountry === countryName) {
            setCurrentCountry('');
        } else {
            setCurrentCountry(countryName);
        }
    };

    useEffect(() => {
        if (currentCountry) {
            api.apis
                .getNationRecord(memberId, currentCountry)
                .then(response => {
                    setAlbumList(response.data);
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        }
    }, [currentCountry]);

    useEffect(() => {
        api.apis
            .getNations(memberId)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, []);

    return (
        <S.Wrap style={{ width: 264, height: 648 }}>
            <S.SearchBar type="text" placeholder="국가 검색하기" value={searchQuery} onChange={handleSearchChange} />
            <div style={{ margin: '10px 0' }}></div>

            {/* 검색 결과를 필터링하여 국가 이름 목록을 렌더링 */}
            {filteredCountryNames.map((filteredCountryName, index) => (
                <S.CountryList
                    key={index}
                    onClick={() => handleSelectCountry(filteredCountryName)}
                    selected={filteredCountryName === currentCountry ? 'selected' : 'null'}>
                    {filteredCountryName}
                </S.CountryList>
            ))}

            {/* 검색 결과가 없는 경우 메시지 출력 또는 검색 결과가 있는데도 검색 결과가 없는 경우 추가 버튼 출력 */}
            {searchQuery &&
                filteredCountryNames.length === 0 &&
                (!isSearchResultInKrData ? (
                    <div>검색 결과가 없습니다. 국가명을 확인해 주세요.</div>
                ) : (
                    <div>
                        <S.Button onClick={handleAddCountry}> {searchQuery}  추가<IoAdd /> </S.Button>
                    </div>
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
        border-radius: 10px;
        text-align: center;
    `,
    Message: styled.div`
        font-size: 15px;  // 글자 크기 조정
        text-align: center;  // 텍스트 중앙 정렬
    `,
    CountryList: styled.div`
        font-size: ${({ theme }) => theme.fontSize.content2};
        // color: ${({ selected, theme }) => (selected === 'selected' ? theme.color.black : theme.color.black)};
        // color: white;
        cursor: pointer;
        margin-bottom: 10px;
        background-color: ${({ selected, theme }) => (selected === 'selected' ? theme.color.main2 : theme.color.main1)};
        &:hover {
            opacity: 0.8;
        }
        border: 1px solid gray; 
        width: 100%;
        height: 35px;
        font-size: 20px;
        text-align: center;
        vertical-align: middle;
        padding-top: 7px;
        border-radius: 9px;
    `,
    checkbox: styled.div`
      padding-right  : 10px;
    `,
    Button: styled.button`
        font-size: ${({ theme }) => theme.fontSize.content2};
        color: ${({ theme }) => theme.color.main2}
        cursor: pointer;
        padding: 10px 15px;  
        border: none;  
        border-radius: 5px; 
        &:hover {
            color: ${({ theme }) => theme.color.main1};
        }
    `
};

export default CountryList;