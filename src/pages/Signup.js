import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImage from "../utils/images/background.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#111827",
    },
    secondary: {
      main: "#FF9800",
    },
  },
});

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );

      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with transparency
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center">
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                value={lastName}
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/company-signup" variant="body2">
                    {"Register as Company"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Signup;
