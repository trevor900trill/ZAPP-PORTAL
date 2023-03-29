import { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import PropTypes from 'prop-types';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    Paper,
    Tab,
    Tabs,
    Typography,
    Slide,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';
import Search from '../dashboard/Search';
import RolesTable from './RolesTable';
import { fetchroles } from 'store/reducers/roles';
// assets
import { GiftOutlined, MessageOutlined, SettingOutlined, UserOutlined, DiffOutlined } from '@ant-design/icons';
import { logOut } from 'store/reducers/accounts';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

const RolesPage = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();

    const roles = useSelector((state) => state.roles);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            var t = await dispatch(fetchroles());
            if (t.type == 'roles/fetchroles/rejected') {
                console.log(t);
                if (t.error.message == 'Unauthorized') {
                    dispatch(logOut());
                    navigate('/login');
                }
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={12}>
                {matchDownMD ? (
                    <Box>
                        <Stack direction="column" alignItems="flex-start" spacing={1}>
                            <Typography variant="h4" color="primary">
                                Sub Counties
                            </Typography>
                            <Search sx={{ width: '100%' }} />
                        </Stack>
                    </Box>
                ) : (
                    <Box>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4" color="primary">
                                    Sub Counties
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Search />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                <MainCard sx={{ mt: 2 }} content={false}>
                    <RolesTable rows={roles.rolesReponse} modalOpen={handleClickOpen} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default RolesPage;
