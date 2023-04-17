// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

const Theme = (colors) => {
    const { red, gold, cyan, green, grey } = colors;
    const greyColors = {
        0: grey[0],
        50: grey[1],
        100: grey[2],
        200: grey[3],
        300: grey[4],
        400: grey[5],
        500: grey[6],
        600: grey[7],
        700: grey[8],
        800: grey[9],
        900: grey[10],
        A50: grey[15],
        A100: grey[11],
        A200: grey[12],
        A400: grey[13],
        A700: grey[14],
        A800: grey[16]
    };
    const contrastText = '#fff';

    return {
        green: ['#075E54', '#087f6a', '#0b8c78', '#13a085', '#16a085', '#1abc9c', '#1abc9c', '#2ecc71', '#27ae60', '#3498db'],
        primary: {
            lighter: '#075E54',
            100: '#087f6a',
            200: '#0b8c78',
            light: '#13a085',
            400: '#16a085',
            main: '#075E54', // Changed from #1abc9c to #075E54
            dark: '#1abc9c',
            700: '#2ecc71',
            darker: '#27ae60',
            900: '#3498db',
            contrastText: '#fff'
        },
        secondary: {
            lighter: greyColors[100],
            100: greyColors[100],
            200: greyColors[200],
            light: greyColors[300],
            400: greyColors[400],
            main: greyColors[500],
            600: greyColors[600],
            dark: greyColors[700],
            800: greyColors[800],
            darker: greyColors[900],
            A100: greyColors[0],
            A200: greyColors.A400,
            A300: greyColors.A700,
            contrastText: greyColors[0]
        },
        error: {
            lighter: red[0],
            light: red[2],
            main: red[4],
            dark: red[7],
            darker: red[9],
            contrastText
        },
        warning: {
            lighter: gold[0],
            light: gold[3],
            main: gold[5],
            dark: gold[7],
            darker: gold[9],
            contrastText: greyColors[100]
        },
        info: {
            lighter: cyan[0],
            light: cyan[3],
            main: cyan[5],
            dark: cyan[7],
            darker: cyan[9],
            contrastText
        },
        success: {
            lighter: green[0],
            light: green[3],
            main: green[5],
            dark: green[7],
            darker: green[9],
            contrastText
        },
        grey: greyColors
    };
};

export default Theme;
