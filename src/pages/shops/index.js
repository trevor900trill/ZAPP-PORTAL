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
import ShopsTable from './ShopsTable';
import { fetchshops } from 'store/reducers/shops';
import { fetchusers } from 'store/reducers/users';

import AddShops from './dialogs/AddShops';
import EditShops from './dialogs/EditShops';
import ViewContributors from './dialogs/ViewContributors';
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

const ShopsPage = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();

    const shops = useSelector((state) => state.shops);

    const [initialDialogValues, setInitialValues] = useState(null);

    const [open, setOpen] = useState(false);

    const handleClickOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [editopen, setEditOpen] = useState(false);

    const handleClickEdit = (initialValues) => {
        setInitialValues(initialValues);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setInitialValues(null);
    };

    const [contributorsopen, setContributorsOpen] = useState(false);

    const handleClickContributor = (initialValues) => {
        setInitialValues(initialValues);
        setContributorsOpen(true);
    };

    const handleContributorClose = () => {
        setContributorsOpen(false);
        setInitialValues(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            var t = await dispatch(fetchshops());
            if (t.type == 'shops/fetchshops/rejected') {
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
            <Dialog open={open} onClose={handleClose} scroll="body" fullScreen={matchDownMD} TransitionComponent={Transition} keepMounted>
                <DialogContent>
                    <AddShops close={handleClose} />
                </DialogContent>
            </Dialog>

            <Dialog
                open={editopen}
                onClose={handleEditClose}
                scroll="body"
                fullScreen={matchDownMD}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogContent>
                    <EditShops close={handleEditClose} initialDialogValues={initialDialogValues} />
                </DialogContent>
            </Dialog>

            <Dialog
                open={editopen}
                onClose={handleContributorClose}
                scroll="body"
                fullScreen={matchDownMD}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogContent>
                    <ViewContributors close={handleContributorClose} initialDialogValues={initialDialogValues} />
                </DialogContent>
            </Dialog>

            <Grid item xs={12} md={12} lg={12}>
                {matchDownMD ? (
                    <Box>
                        <Stack direction="column" alignItems="flex-start" spacing={1}>
                            <Typography variant="h4" color="primary">
                                shops
                            </Typography>
                            <Search sx={{ width: '100%' }} />
                            <Button sx={{ width: '100%' }} variant="contained" onClick={handleClickOpen} startIcon={<DiffOutlined />}>
                                Add Shop
                            </Button>
                            <Button sx={{ width: '100%' }} variant="contained" onClick={handleClickOpen} startIcon={<DiffOutlined />}>
                                Map Contributor
                            </Button>
                        </Stack>
                    </Box>
                ) : (
                    <Box>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <Typography variant="h4" color="primary">
                                Shops
                            </Typography>
                            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                                {/* <Search /> */}
                                <Button variant="contained" onClick={handleClickOpen} startIcon={<DiffOutlined />}>
                                    Add Shop
                                </Button>
                                <Button variant="contained" onClick={handleClickOpen} startIcon={<DiffOutlined />}>
                                    Add Mapping
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                )}

                <MainCard sx={{ mt: 2 }} content={false}>
                    <ShopsTable rows={shops.shopsReponse} modalOpen={handleClickEdit} contributorModalOpen={handleClickContributor} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ShopsPage;
