import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Chip, Stack } from '@mui/material';

// project import
import Logo from './Logo';
import MainCard from 'components/MainCard';
import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
        {/* <Logo /> */}
        <MainCard sx={{ p: 1, bgcolor: '#075E54' }} border={false} content={false}>
            <Stack direction="row" spacing={1} alignItems="center">
                <h3 style={{ color: '#ffffff' }}>Zapp Portal</h3>{' '}
                <Chip
                    label={process.env.REACT_APP_VERSION}
                    size="small"
                    sx={{ height: 16, bgcolor: '#ffffff', '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
                    component="a"
                />
            </Stack>
        </MainCard>
    </ButtonBase>
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
