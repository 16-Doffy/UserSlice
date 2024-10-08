import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Avatar, Typography, Button, InputAdornment, IconButton, LinearProgress } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const schema = yup.object().shape({
  fullName: yup.string()
    .required("Full Name is required")
    .test('two-words', 'Please enter at least two words', (value) => {
      return value && value.trim().split(' ').length >= 2;
    }),
  email: yup.string().email("Please input a valid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, 'Please enter at least 6 characters'),
  retypePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Retype Password is required"),
});

function RegisterForm({ onSubmit }) {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: ''
    }
  });
  const { enqueueSnackbar } = useSnackbar(); // Đảm bảo tên hàm đúng
  const { isSubmitting } = formState; // Lấy isSubmitting từ formState

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const [showRPW, setRpw] = useState(false);
  const toggleRPW = () => setRpw(prev => !prev);

  const handleFormSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
   
  };
  const showNotice = () =>{
    enqueueSnackbar('Register successfully',{variant:'success'})
  }
  
  return (
    <div sx={{ padding: 4 }}>
      { isSubmitting && <LinearProgress />  }
      <Avatar sx={{ margin: "0 auto", color: "white", backgroundColor: "rgb(0, 123, 255)" }}>
        <HowToRegIcon />
      </Avatar>
      <Typography sx={{ margin: "16px 0 24px 0", textAlign: "center" }} variant="h5">
        Create an account
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="fullName"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Full Name"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : ""}
              margin="normal"
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : ""}
              margin="normal"
              fullWidth
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : ""}
              margin="normal"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="retypePassword"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type={showRPW ? "text" : "password"}
              label="Retype Password"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : ""}
              margin="normal"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleRPW}>
                      {showRPW ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Button onClick={showNotice}
          sx={{
            marginTop: 4,
            textAlign: "center",
            width: "50%",
            margin: "0 auto",
            display: "flex",
          }}
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RegisterForm;
