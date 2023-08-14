import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Button,
    Autocomplete,
    FormHelperText,
    Grid,
    CircularProgress,
    InputLabel,
    TextField,
    OutlinedInput,
    Stack,
    MenuItem,
    Alert,
    Typography
} from '@mui/material';
import Select from '@mui/material/Select';

// third party
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import contributors, { addcontributors } from 'store/reducers/contributors';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchshops } from 'store/reducers/shops';
import { fetchusers } from 'store/reducers/users';
// assets

const AddContributor = ({ close }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users);
    const shops = useSelector((state) => state.shops);

    return (
        <>
            <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                Map a Contributor
            </Typography>

            <Formik
                initialValues={{
                    userId: '',
                    shopId: ''
                }}
                validationSchema={Yup.object().shape({
                    shopId: Yup.string().max(255).required('Shop is required'),
                    userId: Yup.string().max(255).required('Owner is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        setSubmitting(true);
                        var t = await dispatch(addcontributors(values));

                        setStatus({ success: false });
                        setSubmitting(false);

                        if (t.type == 'contributors/addcontributors/fulfilled') {
                            resetForm();
                            close();
                            await dispatch(fetchshops());
                        }

                        if (t.type == 'contributors/addcontributors/rejected') {
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
                                    <InputLabel htmlFor="shopId-signup">Shop*</InputLabel>
                                    <Autocomplete
                                        id="shopId-autocomplete"
                                        name="shopId"
                                        options={shops.shopsReponse}
                                        getOptionLabel={(option) => `${option.shopName}`}
                                        // value={values.userId}
                                        disabled={shops.isLoading}
                                        value={shops.shopsReponse.find((user) => user.id === values.shopId) || null}
                                        onChange={(event, newValue) => {
                                            handleChange({
                                                target: {
                                                    name: 'shopId',
                                                    value: newValue ? newValue.id : '' // Assuming `id` is the property that holds the selected value
                                                }
                                            });
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                error={Boolean(touched.shopId && errors.shopId)}
                                                inputProps={{
                                                    ...params.inputProps,
                                                    placeholder: shops.isLoading ? 'Loading...' : 'Select a shop'
                                                }}
                                            />
                                        )}
                                        renderOption={(props, option) => <li {...props}>{option.shopName}</li>}
                                    />
                                    {touched.shopName && errors.shopName && (
                                        <FormHelperText error id="helper-text-shopName-signup">
                                            {errors.shopName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="userId-signup">Contributor*</InputLabel>
                                    <Autocomplete
                                        id="userId-autocomplete"
                                        name="userId"
                                        options={users.usersReponse}
                                        getOptionLabel={(option) => `${option.phoneNumber} (${option.fullName})`}
                                        // value={values.userId}
                                        disabled={users.isLoading}
                                        value={users.usersReponse.find((user) => user.id === values.userId) || null}
                                        onChange={(event, newValue) => {
                                            handleChange({
                                                target: {
                                                    name: 'userId',
                                                    value: newValue ? newValue.id : '' // Assuming `id` is the property that holds the selected value
                                                }
                                            });
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                error={Boolean(touched.userId && errors.userId)}
                                                inputProps={{
                                                    ...params.inputProps,
                                                    placeholder: users.isLoading ? 'Loading...' : 'Select a contributor'
                                                }}
                                            />
                                        )}
                                        renderOption={(props, option) => (
                                            <li {...props}>
                                                {option.phoneNumber} ({option.fullName})
                                            </li>
                                        )}
                                    />

                                    {touched.userId && errors.userId && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.userId}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

                            {contributors.hasError && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        An error occured — <strong>{contributors.errorMessage}</strong>
                                    </Alert>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                    <Button onClick={close}>Cancel</Button>
                                    <AnimateButton>
                                        <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                                            Map Contributor
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

export default AddContributor;
