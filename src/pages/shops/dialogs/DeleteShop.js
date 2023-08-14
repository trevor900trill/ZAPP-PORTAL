import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Button,
    FormHelperText,
    TextField,
    Autocomplete,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    MenuItem,
    Alert,
    Typography
} from '@mui/material';
import Select from '@mui/material/Select';
import MainCard from 'components/MainCard';

// third party
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { editcountries } from 'store/reducers/countries';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchshops } from 'store/reducers/shops';
import { deleteshop } from 'store/reducers/shops';
import { useEffect } from 'react';

// assets

const DeleteShop = ({ close, initialDialogValues }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shops = useSelector((state) => state.shops);

    const handleDeleteShop = async () => {
        try {
            var t = await dispatch(deleteshop(initialDialogValues.id));
            if (t.type == 'shops/deleteshop/fulfilled') {
                close();
                await dispatch(fetchshops());
            }

            if (t.type == 'shops/deleteshop/rejected') {
                if (t.error.message == 'Unauthorized') {
                    dispatch(logOut());
                    navigate('/login');
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                    Are you sure you want to delete this shop?
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                    <Button onClick={close}>Close</Button>
                    <AnimateButton>
                        <Button onClick={handleDeleteShop} disableElevation disabled={shops.isLoading} variant="contained" color="primary">
                            Delete Shop
                        </Button>
                    </AnimateButton>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default DeleteShop;
