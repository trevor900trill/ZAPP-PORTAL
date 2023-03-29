import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    TextField,
    InputLabel,
    OutlinedInput,
    Stack,
    MenuItem,
    Alert,
    Typography
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// third party
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { register } from 'store/reducers/accounts';
import AvailableRolesTable from './AvailableRolesTable';

// assets
import {
    EyeOutlined,
    EyeInvisibleOutlined,
    GiftOutlined,
    MessageOutlined,
    SettingOutlined,
    PlusOutlined,
    DiffOutlined
} from '@ant-design/icons';

const EditRolesDialog = ({ close }) => {
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const roles = useSelector((state) => state.roles);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('');
    }, []);

    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);
    const navigate = useNavigate();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" color="primary" align="center">
                    Edit Roles
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <AvailableRolesTable rows={roles.rolesReponse} />{' '}
            </Grid>

            {accounts.hasError && (
                <Grid item xs={12}>
                    <Alert severity="error">
                        An error occured — <strong>{accounts.errorMessage}</strong>
                    </Alert>
                </Grid>
            )}
            <Grid item xs={12}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                    <Button onClick={close}>Cancel</Button>
                    <AnimateButton>
                        <Button disableElevation variant="contained" color="primary">
                            Apply
                        </Button>
                    </AnimateButton>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default EditRolesDialog;
