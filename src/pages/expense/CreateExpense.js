import React, { useEffect, useState } from "react";
import { Box, Container, Button, InputBase, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { fetchData } from "../../utils/apiUtils";
import Layout from "../../components/Layout";

import { createTheme, ThemeProvider } from "@mui/material/styles";
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

export default function CreateExpense() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await fetchData("/category");
      setLoading(false);
      if (error) {
        setError(error);
      } else {
        setCategories(data);
      }
    };
    fetchExpenses();
  }, []);

  //   console.log("categories", categories);
  return (
    <ThemeProvider theme={theme}>
      <Layout title="Category">
        <Container maxWidth="lg">
          <Box sx={{ mb: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => e.target.value}
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
              onChange={(e) => e.target.value}
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
              Sign In
            </Button>
          </Box>
        </Container>
      </Layout>
    </ThemeProvider>
  );
}
