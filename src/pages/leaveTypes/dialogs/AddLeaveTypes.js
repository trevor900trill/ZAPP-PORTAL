import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, MenuItem, Alert, Typography } from '@mui/material';
import Select from '@mui/material/Select';

// third party
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { addleaveTypes } from 'store/reducers/leaveTypes';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchleaveTypes } from 'store/reducers/leaveTypes';

// assets

const AddLeaveTypes = ({ close }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const leaveTypes = useSelector((state) => state.leaveTypes);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                Add Leave Type
            </Typography>
            <Formik
                initialValues={{
                    tenantId: user.tenantid,
                    createdBy: user.email,
                    modifiedBy: user.email,
                    modifiedOn: getCurrentTime(),
                    isDeleted: false,
                    description: '',
                    name: '',
                    days: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name is required'),
                    description: Yup.string().max(255).required('Description is required'),
                    days: Yup.number('Please enter a valid number').required('Number is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        setSubmitting(true);
                        var t = await dispatch(addleaveTypes(values));

                        setStatus({ success: false });
                        setSubmitting(false);

                        if (t.type == 'leaveTypes/addleaveTypes/fulfilled') {
                            resetForm();
                            close();
                            await dispatch(fetchleaveTypes());
                        }

                        if (t.type == 'leaveTypes/addleaveTypes/rejected') {
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
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-signup">Name*</InputLabel>
                                    <OutlinedInput
                                        id="name-login"
                                        type="name"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                    />
                                    {touched.name && errors.name && (
                                        <FormHelperText error id="helper-text-name-signup">
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="description-signup">Description*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.description && errors.description)}
                                        id="description-signup"
                                        type="description"
                                        value={values.description}
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Description"
                                        inputProps={{}}
                                    />
                                    {touched.description && errors.description && (
                                        <FormHelperText error id="helper-text-description-signup">
                                            {errors.description}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="days-signup">Days*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.days && errors.days)}
                                        id="days-signup"
                                        value={values.days}
                                        name="days"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Days"
                                        type="number"
                                        inputProps={{}}
                                    />
                                    {touched.days && errors.days && (
                                        <FormHelperText error id="helper-text-days-signup">
                                            {errors.days}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

                            {leaveTypes.hasError && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        An error occured — <strong>{leaveTypes.errorMessage}</strong>
                                    </Alert>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                    <Button onClick={close}>Cancel</Button>
                                    <AnimateButton>
                                        <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                                            Add Leave Type
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

export default AddLeaveTypes;
