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

// third party
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { editcountries } from 'store/reducers/countries';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchcontributors } from 'store/reducers/contributors';
import { fetchshops } from 'store/reducers/shops';
import { addshops } from 'store/reducers/shops';
import ContributorsTable from 'pages/shops/dialogs/ContributorsTable';
import { useEffect } from 'react';

// assets

const ViewContributors = ({ close, initialDialogValues }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contributors = useSelector((state) => state.contributors);

    useEffect(() => {
        const fetchData = async () => {
            var t = await dispatch(fetchcontributors());
            if (t.type == 'contributors/fetchcontributors/rejected') {
                if (t.error.message == 'Unauthorized') {
                    dispatch(logOut());
                    navigate('/login');
                }
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <>
            <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                View Contributors
            </Typography>

            <MainCard sx={{ mt: 2 }} content={false}>
                <ContributorsTable rows={contributors.contributorsReponse} modalOpen={handleClickEdit} />
            </MainCard>

            <Button onClick={close}>Cancel</Button>
        </>
    );
};

export default ViewContributors;
