// ==============================|| OVERRIDES - CHIP ||============================== //

export default function Chip(theme) {
    return {
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    '&:active': {
                        boxShadow: 'none'
                    }
                },
                sizeLarge: {
                    fontSize: '1rem',
                    height: 40
                },
                light: {
                    color: 'black',
                    backgroundColor: 'white',
                    borderColor: theme.palette.primary.light,
                    '&.MuiChip-lightError': {
                        color: 'black',
                        backgroundColor: 'white',
                        borderColor: theme.palette.error.light
                    },
                    '&.MuiChip-lightSuccess': {
                        color: 'black',
                        backgroundColor: 'white',
                        borderColor: theme.palette.success.light
                    },
                    '&.MuiChip-lightWarning': {
                        color: 'black',
                        backgroundColor: 'white',
                        borderColor: theme.palette.warning.light
                    }
                }
            }
        }
    };
}
