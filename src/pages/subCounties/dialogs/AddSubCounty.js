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
import { addsubcounties } from 'store/reducers/subcounties';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchsubcounties } from 'store/reducers/subcounties';

// assets

const AddSubCounty = ({ close }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const counties = useSelector((state) => state.counties);
    const subcounties = useSelector((state) => state.subcounties);
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
                    subCountyCode: '',
                    subCountyName: '',
                    countyId: ''
                }}
                validationSchema={Yup.object().shape({
                    subCountyName: Yup.string().max(255).required('Sub County Name is required'),
                    subCountyCode: Yup.string().max(255).required('Sub County Code is required'),
                    countyId: Yup.string().max(255).required('County is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        setSubmitting(true);
                        var t = await dispatch(addsubcounties(values));

                        setStatus({ success: false });
                        setSubmitting(false);

                        if (t.type == 'subcounties/addsubcounties/fulfilled') {
                            resetForm();
                            close();
                            await dispatch(fetchsubcounties());
                        }

                        if (t.type == 'subcounties/addsubcounties/rejected') {
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
                                    <InputLabel htmlFor="subCountyName-signup">Sub County Name*</InputLabel>
                                    <OutlinedInput
                                        id="subCountyName-login"
                                        type="subCountyName"
                                        value={values.subCountyName}
                                        name="subCountyName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="County Name"
                                        fullWidth
                                        error={Boolean(touched.subCountyName && errors.subCountyName)}
                                    />
                                    {touched.subCountyName && errors.subCountyName && (
                                        <FormHelperText error id="helper-text-subCountyName-signup">
                                            {errors.subCountyName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="subCountyCode-signup">County Code*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.subCountyCode && errors.subCountyCode)}
                                        id="subCountyCode-signup"
                                        type="subCountyCode"
                                        value={values.subCountyCode}
                                        name="subCountyCode"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="County Code"
                                        inputProps={{}}
                                    />
                                    {touched.subCountyCode && errors.subCountyCode && (
                                        <FormHelperText error id="helper-text-subCountyCode-signup">
                                            {errors.subCountyCode}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="countyId-signup">County*</InputLabel>
                                    <Select
                                        labelId="countyId-select-label"
                                        id="countyId-select"
                                        name="countyId"
                                        error={Boolean(touched.countyId && errors.countyId)}
                                        value={values.countyId}
                                        onChange={handleChange}
                                    >
                                        {counties.countiesReponse.map((oneCounty) => {
                                            return (
                                                <MenuItem value={oneCounty.id} key={oneCounty.id}>
                                                    {oneCounty.countyName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    {touched.countyId && errors.countyId && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.countyId}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

                            {subcounties.hasError && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        An error occured — <strong>{subcounties.errorMessage}</strong>
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

export default AddSubCounty;
