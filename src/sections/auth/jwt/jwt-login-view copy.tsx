'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Link,
  Alert,
  Stack,
  Container,
  Typography,
} from '@mui/material';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { paths } from 'src/routes/paths';
import { LOGIN_SCHEMA, LOGIN_VALUES } from './constants';
import { PATH_AFTER_LOGIN } from 'src/config-global';

export default function JwtLoginView() {
  const router = useRouter();
  const { login } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [userType, setUserType] = useState<string>('user');

  const methods = useForm({
    resolver: yupResolver(LOGIN_SCHEMA),
    defaultValues: LOGIN_VALUES,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const returnTo = useSearchParams().get('returnTo');
  const handleUserTypeChange = (event: SelectChangeEvent) => {
    setUserType(event.target.value);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = (await login(data, userType)) as any;

      if (result.success) {
        router.push(returnTo || PATH_AFTER_LOGIN);
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
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4" align="center">
        Login to Your Account
      </Typography>

      <Stack direction="column" spacing={0.5} alignItems="center">
        <Typography variant="body2">Don't have an account?</Typography>

        <Link href={paths.auth.jwt.register} variant="subtitle2">
          Register here
        </Link>
      </Stack>
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
    <Stack spacing={2}>
      <RHFTextField name="username" label="Username or Email" />
      <RHFTextField name="password" label="Password" type="password" />
      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link>
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <Container maxWidth="sm">
      {renderHead}
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderUserTypeSelect}
        {renderForm}
      </FormProvider>
    </Container>
  );
}
