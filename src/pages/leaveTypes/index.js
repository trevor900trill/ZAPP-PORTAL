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
import LeaveTypesTable from './LeaveTypesTable';
import { fetchleaveTypes } from 'store/reducers/leaveTypes';
import { fetchlocations } from 'store/reducers/locations';
import AddLeaveTypes from './dialogs/AddLeaveTypes';
import EditLeaveTypes from './dialogs/EditLeaveTypes';
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

const LeaveTypesPage = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();

    const leaveTypes = useSelector((state) => state.leaveTypes);

    const [initialDialogValues, setInitialValues] = useState(null);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
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

    useEffect(() => {
        const fetchData = async () => {
            var t = await dispatch(fetchleaveTypes());
            if (t.type == 'leaveTypes/fetchleaveTypes/rejected') {
                console.log(t);
                if (t.error.message == 'Unauthorized') {
                    dispatch(logOut());
                    navigate('/login');
                }
            } else {
                await dispatch(fetchlocations());
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Dialog open={open} onClose={handleClose} scroll="body" fullScreen={matchDownMD} TransitionComponent={Transition} keepMounted>
                <DialogContent>
                    <AddLeaveTypes close={handleClose} />
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
                    <EditLeaveTypes close={handleEditClose} initialDialogValues={initialDialogValues} />
                </DialogContent>
            </Dialog>

            <Grid item xs={12} md={12} lg={12}>
                {matchDownMD ? (
                    <Box>
                        <Stack direction="column" alignItems="flex-start" spacing={1}>
                            <Typography variant="h4" color="primary">
                                Leave Types
                            </Typography>
                            <Search sx={{ width: '100%' }} />
                            <Button sx={{ width: '100%' }} variant="contained" onClick={handleClickOpen} startIcon={<DiffOutlined />}>
                                Add Leave Type
                            </Button>
                        </Stack>
                    </Box>
                ) : (
                    <Box>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4" color="primary">
                                    Leave Types
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Search />
                                    <Button
                                        sx={{ width: '100%' }}
                                        variant="contained"
                                        onClick={handleClickOpen}
                                        startIcon={<DiffOutlined />}
                                    >
                                        Add Leave Type
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                <MainCard sx={{ mt: 2 }} content={false}>
                    <LeaveTypesTable rows={leaveTypes.leaveTypesReponse} modalOpen={handleClickEdit} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default LeaveTypesPage;
