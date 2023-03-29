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
import { addlocations } from 'store/reducers/locations';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchlocations } from 'store/reducers/locations';

// assets

const AddLocations = ({ close }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const subcounties = useSelector((state) => state.subcounties);
    const locations = useSelector((state) => state.locations);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                Add location
            </Typography>
            <Formik
                initialValues={{
                    tenant: user.tenantid,
                    createdBy: user.email,
                    modifiedBy: user.email,
                    modifiedOn: getCurrentTime(),
                    isDeleted: false,
                    locationCode: '',
                    locationName: ''
                }}
                validationSchema={Yup.object().shape({
                    locationName: Yup.string().max(255).required('location Name is required'),
                    locationCode: Yup.string().max(255).required('location Code is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        setSubmitting(true);
                        var t = await dispatch(addlocations(values));

                        setStatus({ success: false });
                        setSubmitting(false);

                        if (t.type == 'locations/addlocations/fulfilled') {
                            resetForm();
                            close();
                            await dispatch(fetchlocations());
                        }

                        if (t.type == 'locations/addlocations/rejected') {
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
                                    <InputLabel htmlFor="locationName-signup">location Name*</InputLabel>
                                    <OutlinedInput
                                        id="locationName-login"
                                        type="locationName"
                                        value={values.locationName}
                                        name="locationName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="location Name"
                                        fullWidth
                                        error={Boolean(touched.locationName && errors.locationName)}
                                    />
                                    {touched.locationName && errors.locationName && (
                                        <FormHelperText error id="helper-text-locationName-signup">
                                            {errors.locationName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="locationCode-signup">location Code*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.locationCode && errors.locationCode)}
                                        id="locationCode-signup"
                                        type="locationCode"
                                        value={values.locationCode}
                                        name="locationCode"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="location Code"
                                        inputProps={{}}
                                    />
                                    {touched.locationCode && errors.locationCode && (
                                        <FormHelperText error id="helper-text-locationCode-signup">
                                            {errors.locationCode}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="subCountyId-signup">Sub County*</InputLabel>
                                    <Select
                                        labelId="subCountyId-select-label"
                                        id="subCountyId-select"
                                        name="subCountyId"
                                        error={Boolean(touched.subCountyId && errors.subCountyId)}
                                        value={values.subCountyId}
                                        onChange={handleChange}
                                    >
                                        {subcounties.subcountiesReponse.map((oneSubcounty) => {
                                            return (
                                                <MenuItem value={oneSubcounty.id} key={oneSubcounty.id}>
                                                    {oneSubcounty.subCountyName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    {touched.subCountyId && errors.subCountyId && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.subCountyId}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

                            {locations.hasError && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        An error occured — <strong>{locations.errorMessage}</strong>
                                    </Alert>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                    <Button onClick={close}>Cancel</Button>
                                    <AnimateButton>
                                        <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                                            Add location
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

export default AddLocations;
