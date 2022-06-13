import red from '@mui/material/colors/red';
import createTheme from '@mui/material/styles/createTheme';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            light: '#484848',
            main: '#212121',
            dark: '#000000',
            contrastText: '#fff',
        },
        secondary: {
            light: '#f05545',
            main: '#b71c1c',
            dark: '#7f0000',
            contrastText: '#fff',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: { height: '100%' },
                body: { height: '100%' },
                '#root': { height: '100%', display: 'flex', flexDirection: 'column' },
            },
        },
    },
});

export default theme;
