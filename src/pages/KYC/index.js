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
import KYCTable from './KYCTable';
import AddKYCForm from './forms/addKYCForm';
import AddKYCStepperForm from './forms/addKYCStepperForm';
import BankForm from './forms/bankForm';
import MainCard from 'components/MainCard';
import Search from '../dashboard/Search';
import { fetchKYC } from 'store/reducers/kyc';
import { fetchBanks } from 'store/reducers/banks';

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

const KYCPage = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);

    const [bankDialogOpen, setBankDialogOpen] = useState(false);

    const dispatch = useDispatch();

    const kycs = useSelector((state) => state.kyc);

    const banks = useSelector((state) => state.banks);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBankClickOpen = () => {
        setOpen(false);
        setBankDialogOpen(true);
    };

    const handleBankClose = () => {
        setOpen(true);
        setBankDialogOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            // try {
            var t = await dispatch(fetchKYC());
            if (t.type == 'kyc/fetchKYC/rejected') {
                console.log(t);
                if (t.error.message == 'Unauthorized') {
                    dispatch(logOut());
                    navigate('/login');
                }
            } else {
                await dispatch(fetchBanks());
            }
            // handle result
            // } catch (error) {
            //     // handle error
            // }
        };

        fetchData();
    }, [dispatch]);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Dialog open={open} onClose={handleClose} scroll="body" fullScreen={matchDownMD} TransitionComponent={Transition} keepMounted>
                {/* <DialogTitle> Add New Customer KYC</DialogTitle> */}
                <DialogContent>
                    {/* <DialogContentText>Add New Customer KYC</DialogContentText> */}
                    {/* <AddKYCForm close={handleClose} bankOpen={handleBankClickOpen} banks={banks.banksreponse} /> */}
                    <AddKYCStepperForm close={handleClose} bankOpen={handleBankClickOpen} banks={banks.banksreponse} />
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions> */}
            </Dialog>

            <Dialog
                open={bankDialogOpen}
                onClose={handleBankClose}
                scroll="body"
                fullScreen={matchDownMD}
                TransitionComponent={Transition}
                keepMounted
            >
                {/* <DialogTitle> Add New Customer KYC</DialogTitle> */}
                <DialogContent>
                    {/* <DialogContentText>Add New Customer KYC</DialogContentText> */}
                    <BankForm close={handleBankClose} />
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions> */}
            </Dialog>

            <Grid item xs={12} md={12} lg={12}>
                {matchDownMD ? (
                    <Box>
                        <Stack direction="column" alignItems="flex-start" spacing={1}>
                            <Typography variant="h4" color="primary">
                                KYC
                            </Typography>
                            <Search sx={{ width: '100%' }} />
                            <Button sx={{ width: '100%' }} variant="contained" onClick={handleClickOpen} startIcon={<DiffOutlined />}>
                                Add Customer KYC
                            </Button>
                        </Stack>
                    </Box>
                ) : (
                    <Box>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4" color="primary">
                                    KYC
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Search />
                                    <Button
                                        sx={{ width: '100%' }}
                                        onClick={handleClickOpen}
                                        variant="contained"
                                        startIcon={<DiffOutlined />}
                                    >
                                        Add Customer KYC
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                <MainCard sx={{ mt: 2 }} content={false}>
                    <KYCTable rows={kycs.kycreponse} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default KYCPage;
