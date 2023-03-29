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
import { addKyc, fetchKYC } from 'store/reducers/kyc';

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

const AddKYCForm = ({ close, bankOpen, banks }) => {
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
    const kycselector = useSelector((state) => state.kyc);
    const navigate = useNavigate();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const [bank, setBank] = useState('');
    const [relation, setRelation] = useState('');

    const handleBankAccountChange = (event) => {
        setBank(event.target.value);
    };
    const handleRelationChange = (event) => {
        setRelation(event.target.value);
    };

    return (
        <>
            <Formik
                initialValues={{
                    tenant: '1',
                    createdBy: 'string',
                    modifiedBy: 'string',
                    modifiedOn: new Date().toISOString(),
                    firstName: '',
                    middleName: '',
                    surname: '',
                    gender: '',
                    mobileNumber: '',
                    email: '',
                    kra: '',
                    idNumber: '',
                    occupation: '',
                    dob: null,
                    relation: [],
                    customerBankAccount: [],
                    customerLocation: [],
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().max(255).required('First Name is required'),
                    middleName: Yup.string().max(255).required('Middle Name is required'),
                    surname: Yup.string().max(255).required('Surname is required'),
                    gender: Yup.string().required('Gender is required'),
                    mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').required('Mobile number is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    kra: Yup.string()
                        .matches(/^([A-Za-z]){1}([0-9]){9}([A-Za-z]){1}$/, 'KRA PIN is not valid')
                        .required('KRA PIN is required'),
                    idNumber: Yup.string().length(8, 'ID number must be exactly 8 characters long').required('ID number is required'),
                    occupation: Yup.string().required('Occupation is required'),
                    dob: Yup.string().required('Occupation is required'),
                    relation: Yup.array().min(1, 'Add at least one relation'),
                    customerBankAccount: Yup.array().min(1, 'Add at least one account'),
                    customerLocation: Yup.array().min(1, 'Add at least one location')
                })}
                onSubmit={async (values, { setErrors, setStatus, resetForm, setSubmitting }) => {
                    try {
                        setSubmitting(true);
                        values.customerBankAccount = values.customerBankAccount.map((element) => {
                            return {
                                tenant: 'string',
                                createdBy: 'string',
                                modifiedBy: 'string',
                                modifiedOn: new Date().toISOString(),
                                accountName: element,
                                accountNumber: 'string',
                                bankCode: 'string',
                                branchCode: 'string',
                                latitude: 'string'
                            };
                        });
                        values.relation.splice(0, values.relation.length, {
                            tenant: 'string',
                            createdBy: 'string',
                            modifiedBy: 'string',
                            modifiedOn: '2023-03-03T00:55:23.809Z',
                            relationType: 'string',
                            names: 'string',
                            idNumber: 'string'
                        });

                        values.customerLocation.splice(0, values.customerLocation.length, {
                            tenant: 'string',
                            createdBy: 'string',
                            modifiedBy: 'string',
                            modifiedOn: '2023-03-03T17:19:51.688Z',
                            residentialAddress: 'string',
                            country: 'string',
                            county: 'string',
                            longitude: 'string',
                            latitude: 'string',
                            remarks: 'string'
                        });

                        var t = await dispatch(addKyc({ ...values }));
                        console.log(t);

                        setStatus({ success: false });
                        setSubmitting(false);

                        if (t.type == 'kyc/addKyc/fulfilled') {
                            await dispatch(fetchKYC());
                            resetForm(); // clear initialValues
                            close();
                        }

                        if (t.type == 'kyc/addKyc/rejected') {
                            if (t.error.message == 'Unauthorized') {
                                dispatch(logOut());
                                navigate('/login');
                            }
                        }
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
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstName-signup">First Name*</InputLabel>
                                    <OutlinedInput
                                        id="firstName-login"
                                        type="firstName"
                                        value={values.firstName}
                                        name="firstName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John"
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
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="middleName-signup">Middle Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.middleName && errors.middleName)}
                                        id="middleName-signup"
                                        type="middleName"
                                        value={values.middleName}
                                        name="middleName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        inputProps={{}}
                                    />
                                    {touched.middleName && errors.middleName && (
                                        <FormHelperText error id="helper-text-middleName-signup">
                                            {errors.middleName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="surname-signup">Surname*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.surname && errors.surname)}
                                        id="surname-signup"
                                        type="surname"
                                        value={values.surname}
                                        name="surname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        inputProps={{}}
                                    />
                                    {touched.surname && errors.surname && (
                                        <FormHelperText error id="helper-text-surname-signup">
                                            {errors.surname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="mobileNumber-signup">Mobile Number*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.mobileNumber && errors.mobileNumber)}
                                        id="mobileNumber-signup"
                                        value={values.mobileNumber}
                                        name="mobileNumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="254712345678"
                                        inputProps={{}}
                                    />
                                    {touched.mobileNumber && errors.mobileNumber && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.mobileNumber}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="demo@company.com"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="gender-signup">Gender*</InputLabel>
                                    <Select
                                        labelId="gender-select-label"
                                        id="gender-select"
                                        name="gender"
                                        error={Boolean(touched.gender && errors.gender)}
                                        value={values.gender}
                                        label="Male / Female / Prefer not to say"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'Male'}>Male</MenuItem>
                                        <MenuItem value={'Female'}>Female</MenuItem>
                                        <MenuItem value={'Prefer not to say'}>Prefer not to say</MenuItem>
                                    </Select>
                                    {touched.gender && errors.gender && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.gender}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="kra-signup">Kra*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.kra && errors.kra)}
                                        id="kra-signup"
                                        value={values.kra}
                                        name="kra"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="A123456789A"
                                        inputProps={{}}
                                    />
                                    {touched.kra && errors.kra && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.kra}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Id Number*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.idNumber && errors.idNumber)}
                                        id="idNumber-signup"
                                        value={values.idNumber}
                                        name="idNumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="37851681"
                                        inputProps={{}}
                                    />
                                    {touched.idNumber && errors.idNumber && (
                                        <FormHelperText error id="helper-text-idNumber-signup">
                                            {errors.idNumber}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Occupation*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.occupation && errors.occupation)}
                                        id="occupation-signup"
                                        value={values.occupation}
                                        name="occupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Software Engineer"
                                        inputProps={{}}
                                    />
                                    {touched.occupation && errors.occupation && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.occupation}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="dob-signup">Date of Birth*</InputLabel>
                                        <DesktopDatePicker
                                            inputFormat="MM/DD/YYYY"
                                            onChange={(value) => setFieldValue('dob', value, true)}
                                            value={values.dob}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name="dob"
                                                    id="occupation-dob"
                                                    error={Boolean(touched.dob && errors.dob)}
                                                />
                                            )}
                                        />
                                        {touched.dob && errors.dob && (
                                            <FormHelperText error id="helper-text-dob-signup">
                                                {errors.dob}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Bank Account*</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="customerBankAccount"
                                        multiple
                                        value={values.customerBankAccount}
                                        label="Bank Account"
                                        onChange={handleChange}
                                    >
                                        <Stack spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
                                            <Button
                                                sx={{ width: '80%', marginBottom: '30' }}
                                                variant="contained"
                                                onClick={bankOpen}
                                                startIcon={<PlusOutlined />}
                                            >
                                                Add
                                            </Button>
                                        </Stack>
                                        {banks.length != 0 ? (
                                            banks.map((element) => {
                                                return <MenuItem value={element.bankName}>{element.bankName}</MenuItem>;
                                            })
                                        ) : (
                                            <Typography variant="h5">No banks</Typography>
                                        )}
                                    </Select>
                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.phoneNumber}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Relation*</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.relation}
                                        multiple
                                        name="relation"
                                        label="Relation"
                                        onChange={handleChange}
                                    >
                                        <Stack spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
                                            <Button
                                                sx={{ width: '80%', marginBottom: '30' }}
                                                variant="contained"
                                                startIcon={<PlusOutlined />}
                                            >
                                                Add
                                            </Button>
                                        </Stack>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.phoneNumber}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Customer Location*</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.customerLocation}
                                        name="customerLocation"
                                        label="Relation"
                                        multiple
                                        onChange={handleChange}
                                    >
                                        <Stack spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
                                            <Button
                                                sx={{ width: '80%', marginBottom: '30' }}
                                                variant="contained"
                                                startIcon={<PlusOutlined />}
                                            >
                                                Add
                                            </Button>
                                        </Stack>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.phoneNumber}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

                            {kycselector.hasError && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        An Error Occured <strong>{kycselector.errorMessage}</strong>
                                    </Alert>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                    <Button onClick={close}>Cancel</Button>
                                    <AnimateButton>
                                        <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                                            Add Customer KYC
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

export default AddKYCForm;
