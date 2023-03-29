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
import { addregions } from 'store/reducers/regions';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchregions } from 'store/reducers/regions';

// assets

const AddRegions = ({ close }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const regions = useSelector((state) => state.regions);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                Add region
            </Typography>
            <Formik
                initialValues={{
                    tenant: user.tenantid,
                    createdBy: user.email,
                    modifiedBy: user.email,
                    modifiedOn: getCurrentTime(),
                    isDeleted: false,
                    regionCode: '',
                    regionName: ''
                }}
                validationSchema={Yup.object().shape({
                    regionName: Yup.string().max(255).required('region Name is required'),
                    regionCode: Yup.string().max(255).required('region Code is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        setSubmitting(true);
                        var t = await dispatch(addregions(values));

                        setStatus({ success: false });
                        setSubmitting(false);

                        if (t.type == 'regions/addregions/fulfilled') {
                            resetForm();
                            close();
                            await dispatch(fetchregions());
                        }

                        if (t.type == 'regions/addregions/rejected') {
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
                                    <InputLabel htmlFor="regionName-signup">region Name*</InputLabel>
                                    <OutlinedInput
                                        id="regionName-login"
                                        type="regionName"
                                        value={values.regionName}
                                        name="regionName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="region Name"
                                        fullWidth
                                        error={Boolean(touched.regionName && errors.regionName)}
                                    />
                                    {touched.regionName && errors.regionName && (
                                        <FormHelperText error id="helper-text-regionName-signup">
                                            {errors.regionName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="regionCode-signup">region Code*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.regionCode && errors.regionCode)}
                                        id="regionCode-signup"
                                        type="regionCode"
                                        value={values.regionCode}
                                        name="regionCode"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="region Code"
                                        inputProps={{}}
                                    />
                                    {touched.regionCode && errors.regionCode && (
                                        <FormHelperText error id="helper-text-regionCode-signup">
                                            {errors.regionCode}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

                            {regions.hasError && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        An error occured — <strong>{regions.errorMessage}</strong>
                                    </Alert>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                    <Button onClick={close}>Cancel</Button>
                                    <AnimateButton>
                                        <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                                            Add region
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

export default AddRegions;
