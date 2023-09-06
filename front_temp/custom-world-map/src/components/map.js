import React from "react";
import { VectorMap } from "react-jvectormap";
import ColorPicker from "./ColorPicker";

import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
// import { Country, LanguageCode, TranslatedCountry } from 'world_countries_lists';
// import * as worldCountriesLists from 'world_countries_lists';
// const worldCountriesLists = require('world_countries_lists');

const krdata = require('world_countries_lists/data/countries/ko/countries.json');
const { getName } = require("country-list");


class Map extends React.Component {
  state = {
    countriesCodesArray: [],
    countriesNamesArray: [],
    data: {},
    title: "",
    titleSet: false,
    color: "#48aeef"
  };

  handleColorChange = color => {
    console.log(color.hex);
    this.setState({ color: color.hex });
  };

  handleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleFormSubmit = () => {
    this.setState({
      titleSet: true
    });
  };

  handleClick = (e, countryCode) => {
    const { countriesCodesArray } = this.state;
    // console.log(countryCode);
    if (countriesCodesArray.indexOf(countryCode) === -1) {
      this.setState(
        {
          countriesCodesArray: [...countriesCodesArray, countryCode]
        },
        () => this.getCountriesNamesList()
      );
    }
  };

  // 국가 코드와 alpha2가 일치하면 국가 이름을 반환하는 함수
  getCountryNameByCode = countryCode => {
    // 국가 코드를 소문자로 변환
    const lowercaseCountryCode = countryCode.toLowerCase();
    console.log(lowercaseCountryCode)
    // alpha2와 일치하는 국가 데이터 찾기
    const countryData = krdata.find(data => data.alpha2 === lowercaseCountryCode);

    // 국가 데이터가 없으면 빈 문자열 반환, 있으면 해당 국가의 이름 반환
    return countryData ? countryData.name : "";
  };


  getCountriesNamesList = () => {
    const { countriesCodesArray } = this.state;
    const list = countriesCodesArray.map(code => this.getCountryNameByCode(code)); // getCountryNameByCode 함수 사용
    console.log('리스트')
    console.log(list)
    this.setState(
      {
        countriesNamesArray: list
      },
      () => this.makeMapDataStructure()
    );
  };
  
  // getCountriesNamesList = () => {
  //   const { countriesCodesArray } = this.state;
  //   const list = countriesCodesArray.map(code => getName(code));
  //   this.setState(
  //     {
  //       countriesNamesArray: list
  //     },
  //     () => this.makeMapDataStructure()
  //   );
  // };
  



  makeMapDataStructure = () => {
    const { countriesCodesArray } = this.state;
    let obj = {};
    //{CN: 5, MX: 5, TX: 5}
    countriesCodesArray.forEach(countryCode => (obj[countryCode] = 5));
    this.setState({
      data: obj
    });
  };

  render() {
    const { countriesNamesArray, data, title, titleSet, color } = this.state;
    console.log(data)
    console.log(countriesNamesArray)
    return (
      <div>
        <VectorMap
          map={"world_mill"}
          // map={"continents_mill"}
          backgroundColor="transparent" // change it to ocean blue: #0077be
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "520px"
          }}
          onRegionClick={this.handleClick} // gets the country code
          // 한국어로 어캐 해요
          // onRegionLabelShow={(event, label, code) => {
          //   // 국가 코드에 따라 한국어 국가 이름 표시
          //   label.html(countriesNamesArray[code]);
          // }}
          
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer"
            },
            selected: {
              fill: "#2938bc" // color for the clicked country
            },
            selectedHover: {}
          }}
          regionsSelectable={true}
          series={{
            regions: [
              {
                values: data, // this is the map data
                scale: ["#146804", color], // your color game's here
                normalizeFunction: "polynomial"
              }
            ]
          }}
        />
        <Container>
          {titleSet ? (
            <h3>{title}</h3>
          ) : (
            <div>
              <h4>지도 이름 짓기 대회</h4>
              <p> 사실 대회는 아닙니다~ ^^ 님 지도만 이름 지어 보세요</p>
              <form onSubmit={this.handleFormSubmit}>
                <input type="text" onChange={this.handleChange} />
              </form>
            </div>
          )}
          <ColorPickerContainer>
            <ColorPicker
              handleColorChange={this.handleColorChange}
              color={color}
            />
          </ColorPickerContainer>
          <div>
            {countriesNamesArray.map((country, i) => (
              <div key={i}>{country}</div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Map;

const Container = styled.div`
  text-align: center;
  input {
    padding: 10px;
    border-radius: 5px;
    border-shadow: 0;
    border-style: solid;
    font-size: 16px;
    &:focus {
      outline: none;
    }
  }
`;
const ColorPickerContainer = styled.div`
  position: absolute;
`;
