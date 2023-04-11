import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    MenuItem,
    Alert,
    Typography,
    useMediaQuery
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
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
import MainCard from 'components/MainCard';

// assets

const PostApplyLeaveForm = ({ close }) => {
    const theme = useTheme();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const regions = useSelector((state) => state.regions);

    const counties = useSelector((state) => state.counties);

    const user = JSON.parse(localStorage.getItem('user'));

    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={12}>
                <MainCard contentSX={{ p: 2.25 }}>
                    <Box style={{ marginBottom: 30 }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4" color="primary">
                                    Apply Leave
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
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
                            EndLeaveDate: Yup.string().max(255).required('End Leave Date is required')
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
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                                            <OutlinedInput
                                                id="firstName"
                                                type="text"
                                                value={values.firstName}
                                                name="firstName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                fullWidth
                                                error={Boolean(touched.firstName && errors.firstName)}
                                                disabled={true}
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                            <OutlinedInput
                                                id="lastName"
                                                type="text"
                                                value={values.lastName}
                                                name="lastName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                fullWidth
                                                error={Boolean(touched.lastName && errors.lastName)}
                                                disabled={true}
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email">Email</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                id="email"
                                                type="email"
                                                value={values.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{}}
                                                disabled={true}
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email">Department</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                id="deparment"
                                                type="deparment"
                                                value={values.deparment}
                                                name="deparment"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{}}
                                                disabled={true}
                                            />
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="startDate">Start Date</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                id="startDate"
                                                type="date"
                                                value={values.startDate}
                                                name="startDate"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{ min: new Date().toISOString().slice(0, 10) }}
                                                error={Boolean(touched.startDate && errors.startDate)}
                                            />
                                            {touched.startDate && errors.startDate && (
                                                <FormHelperText error id="helper-text-startDate">
                                                    {errors.startDate}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="startDate">End Date</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                id="endDate"
                                                type="date"
                                                value={values.startDate}
                                                name="startDate"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{ min: new Date().toISOString().slice(0, 10) }}
                                                error={Boolean(touched.startDate && errors.startDate)}
                                            />
                                            {touched.startDate && errors.startDate && (
                                                <FormHelperText error id="helper-text-startDate">
                                                    {errors.startDate}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="leaveType">Leave Type</InputLabel>
                                            <Select
                                                labelId="leaveType"
                                                id="leaveType"
                                                name="leaveType"
                                                error={Boolean(touched.leaveType && errors.leaveType)}
                                                value={values.leaveType}
                                                onChange={handleChange}
                                                fullWidth
                                            >
                                                {/* {leaveTypes.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))} */}
                                            </Select>
                                            {touched.leaveType && errors.leaveType && (
                                                <FormHelperText error id="helper-text-leaveType">
                                                    {errors.leaveType}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="availableDays">Available Days</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                id="availableDays"
                                                type="number"
                                                value={values.availableDays}
                                                name="availableDays"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{ min: '0', max: '365' }}
                                                disabled={true}
                                            />
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="countyCode-signup">Reason for leave</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.reason && errors.reason)}
                                                id="reason"
                                                type="reason"
                                                value={values.reason}
                                                name="reason"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Leave reason"
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
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Apply Leave
                                                </Button>
                                            </AnimateButton>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default PostApplyLeaveForm;
