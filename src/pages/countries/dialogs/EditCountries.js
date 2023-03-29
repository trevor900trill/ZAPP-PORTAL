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
import { editcountries } from 'store/reducers/countries';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchcountries } from 'store/reducers/countries';
import { useEffect } from 'react';

// assets

const EditCountries = ({ close, initialDialogValues }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector((state) => state.countries);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                Edit Country
            </Typography>
            {initialDialogValues && (
                <Formik
                    initialValues={{
                        tenant: user.tenantid,
                        createdBy: user.email,
                        modifiedBy: user.email,
                        modifiedOn: getCurrentTime(),
                        isDeleted: false,
                        countryCode: initialDialogValues.countryCode,
                        countryName: initialDialogValues.countryName
                    }}
                    validationSchema={Yup.object().shape({
                        countryName: Yup.string().max(255).required('Country Name is required'),
                        countryCode: Yup.string().max(255).required('Country Code is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                        try {
                            setSubmitting(true);
                            var t = await dispatch(editcountries({ id: initialDialogValues.id, ...values }));

                            setStatus({ success: false });
                            setSubmitting(false);

                            if (t.type == 'countries/editcountries/fulfilled') {
                                resetForm();
                                close();
                                await dispatch(fetchcountries());
                            }

                            if (t.type == 'countries/editcountries/rejected') {
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
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, resetForm, values, setFieldValue }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="countryName-signup">Country Name*</InputLabel>
                                        <OutlinedInput
                                            id="countryName-login"
                                            type="countryName"
                                            value={values.countryName}
                                            name="countryName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Country Name"
                                            fullWidth
                                            error={Boolean(touched.countryName && errors.countryName)}
                                        />
                                        {touched.countryName && errors.countryName && (
                                            <FormHelperText error id="helper-text-countryName-signup">
                                                {errors.countryName}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="countryCode-signup">Country Code*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.countryCode && errors.countryCode)}
                                            id="countryCode-signup"
                                            type="countryCode"
                                            value={values.countryCode}
                                            name="countryCode"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Country Code"
                                            inputProps={{}}
                                        />
                                        {touched.countryCode && errors.countryCode && (
                                            <FormHelperText error id="helper-text-countryCode-signup">
                                                {errors.countryCode}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}

                                {countries.hasError && (
                                    <Grid item xs={12}>
                                        <Alert severity="error">
                                            An error occured — <strong>{countries.errorMessage}</strong>
                                        </Alert>
                                    </Grid>
                                )}

                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                        <Button
                                            onClick={() => {
                                                resetForm();
                                                close();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Edit Country
                                            </Button>
                                        </AnimateButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default EditCountries;
