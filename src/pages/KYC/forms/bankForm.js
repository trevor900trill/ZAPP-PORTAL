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

const BankForm = ({ close }) => {
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

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
        <>
            <Formik
                initialValues={{
                    bankName: '',
                    bankCode: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    bankName: Yup.string().max(255).required('Bank Name is required'),
                    bankCode: Yup.string().max(255).required('Branch Name is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setSubmitting(true);
                        var t = await dispatch(register({ ...values, userName: values.email, tenantId: '1' }));
                        console.log(t);
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstName-signup">Bank Name*</InputLabel>
                                    <OutlinedInput
                                        id="firstName-login"
                                        type="firstName"
                                        value={values.firstName}
                                        name="firstName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Bank"
                                        fullWidth
                                        error={Boolean(touched.firstName && errors.firstName)}
                                    />
                                    {touched.firstName && errors.firstName && (
                                        <FormHelperText error id="helper-text-firstName-signup">
                                            {errors.firstName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="middleName-signup">Branch Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.middleName && errors.middleName)}
                                        id="middleName-signup"
                                        type="middleName"
                                        value={values.middleName}
                                        name="middleName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Branch"
                                        inputProps={{}}
                                    />
                                    {touched.middleName && errors.middleName && (
                                        <FormHelperText error id="helper-text-middleName-signup">
                                            {errors.middleName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

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
                                        <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                                            Add Bank Account
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default BankForm;
