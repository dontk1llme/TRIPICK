import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    //#region 공용 css 설정
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        -webkit-text-size-adjust: none; 
        -moz-text-size-adjust: none; 
        -ms-text-size-adjust: none; 
      
    }
    html,body {
        font-weight: 400;
        font-size: 12px;
        width: 100%;
        height: 100%;

    }
    a {
        cursor: pointer;
        text-decoration: none;
        color: black;
    }
    img {
        border: 0;
        vertical-align: middle;
        image-rendering: -webkit-optimize-contrast !important;
        backface-visibility:hidden !important;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }
    ul,li {
        list-style: none;
    }
    button {
        border: none;
        cursor: pointer;
    }

    @font-face {
        font-family: 'NanumSquareNeo-Variable';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'iceHimchan-Rg';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/iceHimchan-Rg.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: 'NanumSquareNeo-Variable';
    /* font-weight: 300; */
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
    display: block;
    }
    body {
    line-height: 1;
    }
    ol, ul {
    list-style: none;
    }
    blockquote, q {
    quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
    content: '';
    content: none;
    }
    table {
    border-collapse: collapse;
    border-spacing: 0;
    }
    button {
        background-color: #fff;
    }
    //#endregion
    
`;

export default GlobalStyles;
