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
import { addcounties } from 'store/reducers/counties';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchcounties } from 'store/reducers/counties';

// assets

const AddCountyDialog = ({ close }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const regions = useSelector((state) => state.regions);
    const counties = useSelector((state) => state.counties);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                Add County
            </Typography>
            <Formik
                initialValues={{
                    tenant: user.tenantid,
                    createdBy: user.email,
                    modifiedBy: user.email,
                    modifiedOn: getCurrentTime(),
                    isDeleted: false,
                    countyCode: '',
                    countyName: '',
                    regionId: ''
                }}
                validationSchema={Yup.object().shape({
                    countyName: Yup.string().max(255).required('County Name is required'),
                    countyCode: Yup.string().max(255).required('County Code is required'),
                    regionId: Yup.string().max(255).required('Region is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        setSubmitting(true);
                        var t = await dispatch(addcounties(values));

                        setStatus({ success: false });
                        setSubmitting(false);

                        if (t.type == 'counties/addcounties/fulfilled') {
                            resetForm();
                            close();
                            await dispatch(fetchcounties());
                        }

                        if (t.type == 'counties/addcounties/rejected') {
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
                                    <InputLabel htmlFor="countyName-signup">County Name*</InputLabel>
                                    <OutlinedInput
                                        id="countyName-login"
                                        type="countyName"
                                        value={values.countyName}
                                        name="countyName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="County Name"
                                        fullWidth
                                        error={Boolean(touched.countyName && errors.countyName)}
                                    />
                                    {touched.countyName && errors.countyName && (
                                        <FormHelperText error id="helper-text-countyName-signup">
                                            {errors.countyName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="countyCode-signup">County Code*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.countyCode && errors.countyCode)}
                                        id="countyCode-signup"
                                        type="countyCode"
                                        value={values.countyCode}
                                        name="countyCode"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="County Code"
                                        inputProps={{}}
                                    />
                                    {touched.countyCode && errors.countyCode && (
                                        <FormHelperText error id="helper-text-countyCode-signup">
                                            {errors.countyCode}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="regionId-signup">Region*</InputLabel>
                                    <Select
                                        labelId="regionId-select-label"
                                        id="regionId-select"
                                        name="regionId"
                                        error={Boolean(touched.regionId && errors.regionId)}
                                        value={values.regionId}
                                        label="Male / Female / Prefer not to say"
                                        onChange={handleChange}
                                    >
                                        {regions.regionsReponse.map((oneRegion) => {
                                            return (
                                                <MenuItem value={oneRegion.id} key={oneRegion.id}>
                                                    {oneRegion.regionName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    {touched.regionId && errors.regionId && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.regionId}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

                            {counties.hasError && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        An error occured — <strong>{counties.errorMessage}</strong>
                                    </Alert>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                    <Button onClick={close}>Cancel</Button>
                                    <AnimateButton>
                                        <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                                            Add County
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

export default AddCountyDialog;
