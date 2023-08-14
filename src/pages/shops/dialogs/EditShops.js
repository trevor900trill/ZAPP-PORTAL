import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Button,
    FormHelperText,
    TextField,
    Autocomplete,
    Grid,
    InputLabel,
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
import { editcountries } from 'store/reducers/countries';
import { getCurrentTime } from 'store/ip';
import { logOut } from 'store/reducers/accounts';
import { fetchusers } from 'store/reducers/users';
import { fetchshops } from 'store/reducers/shops';
import { editshops } from 'store/reducers/shops';

import { useEffect } from 'react';

// assets

const EditShops = ({ close, initialDialogValues }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users);
    const shops = useSelector((state) => state.shops);

    return (
        <>
            <Typography variant="h4" color="primary" align="center" sx={{ marginTop: 3 }}>
                Edit Shop
            </Typography>
            {initialDialogValues && (
                <Formik
                    initialValues={{
                        id: initialDialogValues.Id,
                        ownerId: initialDialogValues.ownerId,
                        shopName: initialDialogValues.shopName,
                        timestamp: initialDialogValues.Timestamp
                    }}
                    validationSchema={Yup.object().shape({
                        shopName: Yup.string().max(255).required('Shop Name is required'),
                        ownerId: Yup.string().max(255).required('Owner is required')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                        try {
                            setSubmitting(true);
                            var t = await dispatch(editshops(values));

                            setStatus({ success: false });
                            setSubmitting(false);

                            if (t.type == 'shops/editshops/fulfilled') {
                                resetForm();
                                close();
                                await dispatch(fetchshops());
                            }

                            if (t.type == 'shops/editshops/rejected') {
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
                                        <InputLabel htmlFor="shopName-signup">Shop Name*</InputLabel>
                                        <OutlinedInput
                                            id="shopName-login"
                                            type="shopName"
                                            value={values.shopName}
                                            name="shopName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Shop Name"
                                            fullWidth
                                            error={Boolean(touched.shopName && errors.shopName)}
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
                                        <InputLabel htmlFor="ownerId-signup">Owner*</InputLabel>
                                        <Autocomplete
                                            id="ownerId-autocomplete"
                                            name="ownerId"
                                            options={users.usersReponse}
                                            getOptionLabel={(option) => `${option.phoneNumber} (${option.fullName})`}
                                            // value={values.ownerId}
                                            disabled={users.isLoading}
                                            value={users.usersReponse.find((user) => user.id === values.ownerId) || null}
                                            onChange={(event, newValue) => {
                                                handleChange({
                                                    target: {
                                                        name: 'ownerId',
                                                        value: newValue ? newValue.id : '' // Assuming `id` is the property that holds the selected value
                                                    }
                                                });
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    error={Boolean(touched.ownerId && errors.ownerId)}
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        placeholder: users.isLoading ? 'Loading...' : 'Select an owner'
                                                    }}
                                                />
                                            )}
                                            renderOption={(props, option) => (
                                                <li {...props}>
                                                    {option.phoneNumber} ({option.fullName})
                                                </li>
                                            )}
                                        />

                                        {touched.ownerId && errors.ownerId && (
                                            <FormHelperText error id="helper-text-company-signup">
                                                {errors.ownerId}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}

                                {shops.hasError && (
                                    <Grid item xs={12}>
                                        <Alert severity="error">
                                            An error occured — <strong>{shops.errorMessage}</strong>
                                        </Alert>
                                    </Grid>
                                )}

                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                                        <Button onClick={close}>Cancel</Button>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Edit Shop
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

export default EditShops;
