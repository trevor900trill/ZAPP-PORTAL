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

const PostApplyLeaveForm = ({ close }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const regions = useSelector((state) => state.regions);
    const counties = useSelector((state) => state.counties);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                Apply Leave
            </Typography>
            <Formik
                initialValues={{
                    tenant: user.tenantid,
                    createdBy: user.email,
                    modifiedBy: user.email,
                    modifiedOn: getCurrentTime(),
                    isDeleted: false,
                    applicationUserId: '',
                    countyName: '',
                    regionId: ''
                }}
                validationSchema={Yup.object().shape({
                    StartLeaveDate: Yup.string().max(255).required('Start Leave Date is required'),
                    EndLeaveDate: Yup.string().max(255).required('End Leave Date is required'),
                    LeaveType: Yup.string().max(255).required('Leave Type is required')
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
                                    <InputLabel htmlFor="countyName-signup">Full Names</InputLabel>
                                    <OutlinedInput
                                        id="countyName-login"
                                        type="fullNames"
                                        value={values.countyName}
                                        name="fullNames"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.countyName && errors.countyName)}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="email"
                                        type="email"
                                        value={values.countyCode}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="regionId-signup">Leave Type</InputLabel>
                                    <Select
                                        labelId="leaveType"
                                        id="leaveTypeId-select"
                                        name="leaveTypeId"
                                        error={Boolean(touched.regionId && errors.regionId)}
                                        value={values.regionId}
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

                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="countyCode-signup">Start Date</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.countyCode && errors.countyCode)}
                                        id="countyCode-signup"
                                        type="startDate"
                                        value={values.countyCode}
                                        name="startDate"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
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
                                    <InputLabel htmlFor="countyCode-signup">End Date</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.endDate && errors.endDate)}
                                        type="endDate"
                                        value={values.endDate}
                                        name="endDate"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
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
                                    <InputLabel htmlFor="countyCode-signup">Reason for leave</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.reason && errors.reason)}
                                        id="countyCode-signup"
                                        type="reason"
                                        value={values.reason}
                                        name="reason"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Leave reason"
                                        inputProps={{}}
                                    />
                                    {touched.countyCode && errors.countyCode && (
                                        <FormHelperText error id="helper-text-countyCode-signup">
                                            {errors.countyCode}
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

export default PostApplyLeaveForm;
