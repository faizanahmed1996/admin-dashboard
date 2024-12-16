'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { useAuthContext } from 'src/auth/hooks';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { REGISTER_VALUES, REGISTER_SCHEMA } from './constants';

export default function JwtRegisterView() {
  const { register } = useAuthContext();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [userType, setUserType] = useState<string>('user');

  const methods = useForm({
    resolver: yupResolver(REGISTER_SCHEMA),
    defaultValues: REGISTER_VALUES,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleUserTypeChange = (event: SelectChangeEvent) => {
    setUserType(event.target.value);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = (await register(data, userType)) as any;

      if (result.success) {
        router.push('/auth/jwt/login');
      } else {
        setErrorMsg(result.error);
        reset();
      }
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : 'An unexpected error occurred');
    }
  });

  const renderHead = (
    <Stack spacing={1} sx={{ mb: 5, textAlign: 'center' }}>
      <Typography variant="h4">Get started absolutely free</Typography>
      <Typography variant="body2">Already have an account?</Typography>
      <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
        Sign in
      </Link>
    </Stack>
  );

  const renderUserTypeSelect = (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>User Type</InputLabel>
      <Select value={userType} label="User Type" onChange={handleUserTypeChange}>
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="superadmin">Super Admin</MenuItem>
      </Select>
    </FormControl>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="name" label="Name" />
      <RHFTextField name="username" label="Username" />
      <RHFTextField name="email" label="Email address" />
      <RHFTextField name="password" label="Password" type="password" />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Create account
      </LoadingButton>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  return (
    <Container maxWidth="sm">
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderUserTypeSelect}
        {renderForm}
      </FormProvider>

      {renderTerms}
    </Container>
  );
}
