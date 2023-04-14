import { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

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
import { useNavigate } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { addLeaveApplications } from 'store/reducers/LeaveApplications';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchLeaveApplications } from 'store/reducers/LeaveApplications';
import MainCard from 'components/MainCard';
import { fetchleaveTypes } from 'store/reducers/leaveTypes';

// assets

const PostApplyLeaveForm = () => {
    const theme = useTheme();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const leaveTypes = useSelector((state) => state.leaveTypes);

    const LeaveApplications = useSelector((state) => state.LeaveApplications);

    const user = JSON.parse(localStorage.getItem('user'));

    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const fetchData = async () => {
            var t = await dispatch(fetchleaveTypes());
            if (t.type == 'leaveTypes/fetchleaveTypes/rejected') {
                console.log(t);
                if (t.error.message == 'Unauthorized') {
                    dispatch(logOut());
                    navigate('/login');
                }
            }
        };

        fetchData();
    }, [dispatch]);

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
                            tenantId: user.tenantid,
                            createdBy: user.email,
                            createdOn: getCurrentTime(),
                            applicationUserId: user.applicationUserId,
                            employeeId: '',
                            leaveTypePublicId: '',
                            startDate: '',
                            endDate: '',
                            reason: '',
                            availableDays: '0',
                            deparment: 'IT',
                            myHODEmploymentId: user.myHODEmploymentId,
                            firstName: user.firstname,
                            lastName: user.lastname
                        }}
                        validationSchema={Yup.object().shape({
                            leaveTypePublicId: Yup.string().max(255).required('Start Leave Date is required'),
                            startDate: Yup.string().max(255).required('Start Leave Date is required'),
                            endDate: Yup.string().max(255).required('Start Leave Date is required'),
                            reason: Yup.string().max(255).required('Start Leave Date is required')
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                            try {
                                setSubmitting(true);
                                var t = await dispatch(addLeaveApplications(values));

                                setStatus({ success: false });
                                setSubmitting(false);

                                if (t.type == 'LeaveApplications/addLeaveApplications/fulfilled') {
                                    resetForm();
                                }

                                if (t.type == 'LeaveApplications/addLeaveApplications/rejected') {
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
                                                type="firstName"
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
                                                value={values.createdBy}
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
                                            <InputLabel htmlFor="endDate">End Date</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                id="endDate"
                                                type="date"
                                                value={values.endDate}
                                                name="endDate"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                inputProps={{ min: new Date().toISOString().slice(0, 10) }}
                                                error={Boolean(touched.endDate && errors.endDate)}
                                            />
                                            {touched.endDate && errors.endDate && (
                                                <FormHelperText error id="helper-text-endDate">
                                                    {errors.endDate}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="leaveTypePublicId">Leave Type</InputLabel>
                                            <Select
                                                labelId="leaveTypePublicId"
                                                id="leaveTypePublicId"
                                                name="leaveTypePublicId"
                                                error={Boolean(touched.leaveTypePublicId && errors.leaveTypePublicId)}
                                                value={values.leaveTypePublicId}
                                                onChange={handleChange}
                                                fullWidth
                                            >
                                                {leaveTypes.leaveTypesReponse.map((type) => (
                                                    <MenuItem key={type.publicId} value={type.publicId}>
                                                        {type.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {touched.leaveTypePublicId && errors.leaveTypePublicId && (
                                                <FormHelperText error id="helper-text-leaveTypePublicId">
                                                    {errors.leaveTypePublicId}
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

                                    {LeaveApplications.hasError && (
                                        <Grid item xs={12}>
                                            <Alert severity="error">
                                                An error occured — <strong>{LeaveApplications.errorMessage}</strong>
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
