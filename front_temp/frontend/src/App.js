import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import * as styles from 'style';
import * as utils from 'utils';
import * as pages from 'pages';
import * as components from 'components';

const App = () => {
    return (
        <ThemeProvider theme={styles.Theme}>
            <styles.GlobalStyles />
            <Router>
                <Routes>
                    <Route path={utils.URL.HOME.MAIN} element={<components.Layout />}>
                        <Route path={utils.URL.HOME.LANDING} element={<pages.Landing />}></Route>
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
