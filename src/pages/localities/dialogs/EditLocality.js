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
import { editlocalities } from 'store/reducers/localities';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchlocalities } from 'store/reducers/localities';
import { useEffect } from 'react';

// assets

const EditLocality = ({ close, initialDialogValues }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locations = useSelector((state) => state.locations);
    const localities = useSelector((state) => state.localities);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                Edit locality
            </Typography>
            {initialDialogValues && (
                <Formik
                    initialValues={{
                        tenant: user.tenantid,
                        createdBy: user.email,
                        modifiedBy: user.email,
                        modifiedOn: getCurrentTime(),
                        isDeleted: false,
                        localityCode: initialDialogValues.localityCode,
                        localityName: initialDialogValues.localityName,
                        locationId: initialDialogValues.locationId //regions.regionsReponse.find((element) => element.id == initialDialogValues.locationId).regionNames
                    }}
                    validationSchema={Yup.object().shape({
                        localityName: Yup.string().max(255).required('locality Name is required'),
                        localityCode: Yup.string().max(255).required('locality Code is required'),
                        locationId: Yup.string().max(255).required('Location is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                        try {
                            setSubmitting(true);
                            var t = await dispatch(editlocalities({ id: initialDialogValues.id, ...values }));

                            setStatus({ success: false });
                            setSubmitting(false);

                            if (t.type == 'localities/editlocalities/fulfilled') {
                                resetForm();
                                close();
                                await dispatch(fetchlocalities());
                            }

                            if (t.type == 'localities/editlocalities/rejected') {
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
                                        <InputLabel htmlFor="localityName-signup">locality Name*</InputLabel>
                                        <OutlinedInput
                                            id="localityName-login"
                                            type="localityName"
                                            value={values.localityName}
                                            name="localityName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="locality Name"
                                            fullWidth
                                            error={Boolean(touched.localityName && errors.localityName)}
                                        />
                                        {touched.localityName && errors.localityName && (
                                            <FormHelperText error id="helper-text-localityName-signup">
                                                {errors.localityName}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="localityCode-signup">locality Code*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.localityCode && errors.localityCode)}
                                            id="localityCode-signup"
                                            type="localityCode"
                                            value={values.localityCode}
                                            name="localityCode"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="locality Code"
                                            inputProps={{}}
                                        />
                                        {touched.localityCode && errors.localityCode && (
                                            <FormHelperText error id="helper-text-localityCode-signup">
                                                {errors.localityCode}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="locationId-signup">Location*</InputLabel>
                                        <Select
                                            labelId="locationId-select-label"
                                            id="locationId-select"
                                            name="locationId"
                                            error={Boolean(touched.locationId && errors.locationId)}
                                            value={values.locationId}
                                            onChange={handleChange}
                                        >
                                            {locations.locationsReponse.map((oneLocation) => {
                                                return (
                                                    <MenuItem value={oneLocation.id} key={oneLocation.id}>
                                                        {oneLocation.locationName}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                        {touched.locationId && errors.locationId && (
                                            <FormHelperText error id="helper-text-company-signup">
                                                {errors.locationId}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}

                                {localities.hasError && (
                                    <Grid item xs={12}>
                                        <Alert severity="error">
                                            An error occured — <strong>{localities.errorMessage}</strong>
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
                                                Edit locality
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

export default EditLocality;
