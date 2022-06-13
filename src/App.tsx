import React, { ChangeEventHandler, lazy } from 'react';
// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Styles
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from 'utils/theme';
// Layout
import AppNavBar from 'components/Layouts/AppNavBar';
// Pages
// import {MainPage, Camera, ProfilePage} from "./pages";
const MainPage = lazy(() => import('pages/MainPage'));
const TranslationPage = lazy(() => import('pages/TranslationPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));
const NodeFlowPage = lazy(() => import('pages/NodeFlowPage'));
const NodeFlowLoadPage = lazy(() => import('pages/NodeFlowLoadPage'));
const DNDLoadPage = lazy(() => import('pages/DNDLoadPage'));

const App: React.FC = () => {
    const handleOnSearchChange: ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        console.log(e.target.value);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AppNavBar onSearchChange={handleOnSearchChange} />
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/camera" component={TranslationPage} />
                    <Route exact path="/profile" component={ProfilePage} />
                    <Route exact path="/ui" component={NodeFlowPage} />
                    <Route exact path="/ui-loader" component={NodeFlowLoadPage} />
                    <Route exact path="/dnd-ui-loader" component={DNDLoadPage} />
                </Switch>
            </Router>
            <CssBaseline />
        </ThemeProvider>
    );
};

export default App;
