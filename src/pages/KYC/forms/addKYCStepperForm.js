import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    TextField,
    InputLabel,
    OutlinedInput,
    Stack,
    MenuItem,
    Alert,
    Typography,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select from '@mui/material/Select';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { FileUploader } from 'react-drag-drop-files';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { addKyc, fetchKYC } from 'store/reducers/kyc';

// assets
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';

const steps = ['Customer Details', 'Banking Details', 'Customer Address', 'Relation Details', 'Upload Documents'];

const AddKYCStepperForm = ({ close, bankOpen, banks }) => {
    const dispatch = useDispatch();

    const kycselector = useSelector((state) => state.kyc);

    const navigate = useNavigate();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const [activeStep, setActiveStep] = useState(0);

    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}></StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                {steps[activeStep]}
            </Typography>
            {activeStep === 0 ? (
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
                        dob: '',
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
                        dob: Yup.string().required('Dob is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, resetForm, setSubmitting }) => {}}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, validateField }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3} sx={{ marginTop: 3, marginBottom: 3 }}>
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

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                    {activeStep === 0 ? (
                                        <Button onClick={close}>Cancel</Button>
                                    ) : (
                                        <Button onClick={handleBack}>Previous</Button>
                                    )}
                                    {activeStep === steps.length - 1 ? (
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add Customer KYC
                                            </Button>
                                        </AnimateButton>
                                    ) : (
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                onClick={() => {
                                                    validateField();
                                                    handleNext();
                                                }}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Next
                                            </Button>
                                        </AnimateButton>
                                    )}
                                </Stack>
                            </Grid>
                        </form>
                    )}
                </Formik>
            ) : activeStep === 1 ? (
                <Formik
                    initialValues={{
                        BankName: '',
                        BranchName: '',
                        AccountName: '',
                        AccountNumber: '',
                        SwiftCode: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        BankName: Yup.string().max(255).required('Bank Name is required'),
                        BranchName: Yup.string().max(255).required('Branch Name is required'),
                        AccountName: Yup.string().max(255).required('Account Name is required'),
                        AccountNumber: Yup.string().required('Account Number is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, resetForm, setSubmitting }) => {}}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, validateField }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3} sx={{ marginTop: 3, marginBottom: 3 }}>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="BankName-signup">Bank Name*</InputLabel>
                                        <Select
                                            labelId="BankName-select-label"
                                            id="BankName-select"
                                            name="BankName"
                                            error={Boolean(touched.BankName && errors.BankName)}
                                            value={values.BankName}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'Barclays'}>Barclays</MenuItem>
                                            <MenuItem value={'KCB'}>KCB</MenuItem>
                                            <MenuItem value={'NCBA'}>NCBA</MenuItem>
                                        </Select>
                                        {touched.BankName && errors.BankName && (
                                            <FormHelperText error id="helper-text-company-signup">
                                                {errors.BankName}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="BranchName-signup">Branch Name*</InputLabel>
                                        <Select
                                            labelId="BranchName-select-label"
                                            id="BranchName-select"
                                            name="BranchName"
                                            error={Boolean(touched.BranchName && errors.BranchName)}
                                            value={values.BranchName}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'Nairobi'}>Nairobi</MenuItem>
                                            <MenuItem value={'Komarock'}>Komarock</MenuItem>
                                            <MenuItem value={'Westlands'}>Westlands</MenuItem>
                                        </Select>
                                        {touched.BranchName && errors.BranchName && (
                                            <FormHelperText error id="helper-text-company-signup">
                                                {errors.BranchName}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="AccountName-signup">Account Name*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.AccountName && errors.AccountName)}
                                            id="AccountName-signup"
                                            type="AccountName"
                                            value={values.AccountName}
                                            name="AccountName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Account Name"
                                            inputProps={{}}
                                        />
                                        {touched.AccountName && errors.AccountName && (
                                            <FormHelperText error id="helper-text-AccountName-signup">
                                                {errors.AccountName}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="AccountNumber-signup">Account Number*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.AccountNumber && errors.AccountNumber)}
                                            id="AccountNumber-signup"
                                            value={values.AccountNumber}
                                            name="AccountNumber"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Account Number"
                                            inputProps={{}}
                                        />
                                        {touched.AccountNumber && errors.AccountNumber && (
                                            <FormHelperText error id="helper-text-company-signup">
                                                {errors.AccountNumber}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="SwiftCode-signup">Swift Code</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.SwiftCode && errors.SwiftCode)}
                                            id="SwiftCode-login"
                                            type="SwiftCode"
                                            value={values.SwiftCode}
                                            name="SwiftCode"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="023190"
                                            inputProps={{}}
                                        />
                                    </Stack>
                                </Grid>

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                    {activeStep === 0 ? (
                                        <Button onClick={close}>Cancel</Button>
                                    ) : (
                                        <Button onClick={handleBack}>Previous</Button>
                                    )}
                                    {activeStep === steps.length - 1 ? (
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add Customer KYC
                                            </Button>
                                        </AnimateButton>
                                    ) : (
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                onClick={() => {
                                                    validateField();
                                                    handleNext();
                                                }}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Next
                                            </Button>
                                        </AnimateButton>
                                    )}
                                </Stack>
                            </Grid>
                        </form>
                    )}
                </Formik>
            ) : activeStep === 2 ? (
                <Formik
                    initialValues={{
                        County: '',
                        SubCounty: '',
                        Location: '',
                        Address: '',
                        Longitude: '',
                        Latitude: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        County: Yup.string().max(255).required('Bank Name is required'),
                        SubCounty: Yup.string().max(255).required('Bank Name is required'),
                        Location: Yup.string().max(255).required('Bank Name is required'),
                        Address: Yup.string().max(255).required('Bank Name is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, resetForm, setSubmitting }) => {}}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, validateField }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3} sx={{ marginTop: 3, marginBottom: 3 }}>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="County-signup">County*</InputLabel>
                                        <Select
                                            labelId="County-select-label"
                                            id="County-select"
                                            name="County"
                                            error={Boolean(touched.County && errors.County)}
                                            value={values.County}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'Nairobi'}>Nairobi</MenuItem>
                                            <MenuItem value={'Komarock'}>Komarock</MenuItem>
                                            <MenuItem value={'Westlands'}>Westlands</MenuItem>
                                        </Select>
                                        {touched.County && errors.County && (
                                            <FormHelperText error id="helper-text-company-signup">
                                                {errors.County}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="SubCounty-signup">Sub County*</InputLabel>
                                        <Select
                                            labelId="SubCounty-select-label"
                                            id="SubCounty-select"
                                            name="SubCounty"
                                            error={Boolean(touched.SubCounty && errors.SubCounty)}
                                            value={values.SubCounty}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'Nairobi'}>Nairobi</MenuItem>
                                            <MenuItem value={'Komarock'}>Komarock</MenuItem>
                                            <MenuItem value={'Westlands'}>Westlands</MenuItem>
                                        </Select>
                                        {touched.SubCounty && errors.SubCounty && (
                                            <FormHelperText error id="helper-text-company-signup">
                                                {errors.SubCounty}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="Location-signup">Location*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.Location && errors.Location)}
                                            id="Location-signup"
                                            type="Location"
                                            value={values.Location}
                                            name="Location"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Location"
                                            inputProps={{}}
                                        />
                                        {touched.Location && errors.Location && (
                                            <FormHelperText error id="helper-text-Location-signup">
                                                {errors.Location}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="Address -signup">Address*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.Address && errors.Address)}
                                            id="Address -signup"
                                            value={values.Address}
                                            name="Address "
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Address"
                                            inputProps={{}}
                                        />
                                        {touched.Address && errors.Address && (
                                            <FormHelperText error id="helper-text-company-signup">
                                                {errors.Address}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="Longitude -signup">Longitude</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.Longitude && errors.Longitude)}
                                            id="Longitude -signup"
                                            type="Longitude "
                                            value={values.Longitude}
                                            name="Longitude "
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Longitude "
                                            inputProps={{}}
                                        />
                                        {touched.Longitude && errors.Longitude && (
                                            <FormHelperText error id="helper-text-Longitude -signup">
                                                {errors.Longitude}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="Latitude-signup">Latitude</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.Latitude && errors.Latitude)}
                                            id="Latitude -signup"
                                            value={values.Latitude}
                                            name="Latitude "
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Latitude"
                                            inputProps={{}}
                                        />
                                        {touched.Latitude && errors.Latitude && (
                                            <FormHelperText error id="helper-text-company-signup">
                                                {errors.Latitude}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                    {activeStep === 0 ? (
                                        <Button onClick={close}>Cancel</Button>
                                    ) : (
                                        <Button onClick={handleBack}>Previous</Button>
                                    )}
                                    {activeStep === steps.length - 1 ? (
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add Customer KYC
                                            </Button>
                                        </AnimateButton>
                                    ) : (
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                onClick={() => {
                                                    validateField();
                                                    handleNext();
                                                }}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Next
                                            </Button>
                                        </AnimateButton>
                                    )}
                                </Stack>
                            </Grid>
                        </form>
                    )}
                </Formik>
            ) : activeStep === 3 ? (
                <Formik
                    initialValues={{
                        Name: '',
                        TypeofRelation: '',
                        MobileNumber: '',
                        Email: '',
                        Address: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        Name: Yup.string().max(255).required('Name is required'),
                        TypeofRelation: Yup.string().max(255).required('Type of relation is required'),
                        MobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').required('Mobile number is required'),
                        Email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                        Address: Yup.string().max(255).required('Address is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, resetForm, setSubmitting }) => {}}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, validateField }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3} sx={{ marginTop: 3, marginBottom: 3 }}>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="Name-signup">Name*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.Name && errors.Name)}
                                            id="Name-signup"
                                            type="Name"
                                            value={values.Name}
                                            name="Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Name"
                                            inputProps={{}}
                                        />
                                        {touched.Name && errors.Name && (
                                            <FormHelperText error id="helper-text-Name-signup">
                                                {errors.Name}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="TypeofRelation-signup">TypeofRelation*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.TypeofRelation && errors.TypeofRelation)}
                                            id="TypeofRelation-signup"
                                            type="TypeofRelation"
                                            value={values.TypeofRelation}
                                            name="TypeofRelation"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="TypeofRelation"
                                            inputProps={{}}
                                        />
                                        {touched.TypeofRelation && errors.TypeofRelation && (
                                            <FormHelperText error id="helper-text-TypeofRelation-signup">
                                                {errors.TypeofRelation}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="MobileNumber-signup">MobileNumber*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.MobileNumber && errors.MobileNumber)}
                                            id="MobileNumber-signup"
                                            type="MobileNumber"
                                            value={values.MobileNumber}
                                            name="MobileNumber"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="MobileNumber"
                                            inputProps={{}}
                                        />
                                        {touched.MobileNumber && errors.MobileNumber && (
                                            <FormHelperText error id="helper-text-MobileNumber-signup">
                                                {errors.MobileNumber}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="Email-signup">Email*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.Email && errors.Email)}
                                            id="Email-relation"
                                            value={values.Email}
                                            name="Email "
                                            type="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            inputProps={{}}
                                        />
                                        {touched.Email && errors.Email && (
                                            <FormHelperText error id="helper-text-company-signup">
                                                {errors.Email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="Address-signup">Address</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.Address && errors.Address)}
                                            id="Address-signup"
                                            type="Address "
                                            value={values.Address}
                                            name="Address "
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Address "
                                            inputProps={{}}
                                        />
                                        {touched.Address && errors.Address && (
                                            <FormHelperText error id="helper-text-Address -signup">
                                                {errors.Address}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                    {activeStep === 0 ? (
                                        <Button onClick={close}>Cancel</Button>
                                    ) : (
                                        <Button onClick={handleBack}>Previous</Button>
                                    )}
                                    {activeStep === steps.length - 1 ? (
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add Customer KYC
                                            </Button>
                                        </AnimateButton>
                                    ) : (
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                onClick={() => {
                                                    validateField();
                                                    handleNext();
                                                }}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Next
                                            </Button>
                                        </AnimateButton>
                                    )}
                                </Stack>
                            </Grid>
                        </form>
                    )}
                </Formik>
            ) : (
                <Formik
                    initialValues={{
                        Name: '',
                        TypeofRelation: '',
                        MobileNumber: '',
                        Email: '',
                        Address: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        Name: Yup.string().max(255).required('Name is required'),
                        TypeofRelation: Yup.string().max(255).required('Type of relation is required'),
                        MobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').required('Mobile number is required'),
                        Email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                        Address: Yup.string().max(255).required('Address is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, resetForm, setSubmitting }) => {}}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, validateField }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3} sx={{ marginTop: 3, marginBottom: 3 }}>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="ID-signup">Attach ID</InputLabel>
                                        <FileUploader handleChange={handleChange} name="file" />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="Kra-signup">Attach Kra</InputLabel>
                                        <FileUploader handleChange={handleChange} name="file" />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="Files-signup">Other files</InputLabel>
                                        <FileUploader handleChange={handleChange} name="file" />
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                    {activeStep === 0 ? (
                                        <Button onClick={close}>Cancel</Button>
                                    ) : (
                                        <Button onClick={handleBack}>Previous</Button>
                                    )}
                                    {activeStep === steps.length - 1 ? (
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add Customer KYC
                                            </Button>
                                        </AnimateButton>
                                    ) : (
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                onClick={() => {
                                                    validateField();
                                                    handleNext();
                                                }}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Next
                                            </Button>
                                        </AnimateButton>
                                    )}
                                </Stack>
                            </Grid>
                        </form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default AddKYCStepperForm;
