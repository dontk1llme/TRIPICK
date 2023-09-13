import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CountryProvider } from './components/diary/CountryContext';

import * as styles from 'style';
import * as utils from 'utils';
import * as pages from 'pages';
import * as components from 'components';

const App = () => {
    return (
        <ThemeProvider theme={styles.Theme}>
            <CountryProvider>
                <styles.GlobalStyles />
                <Router>
                    <Routes>
                        <Route path={utils.URL.HOME.MAIN} element={<components.Layout />}>
                            <Route path={utils.URL.HOME.LANDING} element={<pages.Landing />}></Route>
                            <Route path={utils.URL.CART.LIST} element={<pages.Cart />}></Route>
                            <Route path={utils.URL.MYPAGE.PASSPORT} element={<pages.MyPage />}></Route>
                            <Route path={utils.URL.MYPAGE.DIARY} element={<pages.Diary />}></Route>
                            <Route path={utils.URL.RECOMMEND.CALENDAR} element={<pages.Recommend />}></Route>
                            <Route path={utils.URL.CART.COMPARE} element={<pages.Compare />}></Route>
                        </Route>
                    </Routes>
                </Router>
            </CountryProvider>
        </ThemeProvider>
    );
};

export default App;