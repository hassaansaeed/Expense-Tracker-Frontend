import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { fetchData, postData } from "../../utils/apiUtils";
import Layout from "../../components/Layout";
import DynamicTextField from "../../components/DynamicTextField";
import DynamicSelectBox from "../../components/DynamicSelectBox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

export default function CreateCompany() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchExpenses = async () => {
      // setLoading(true);
    };
    fetchExpenses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!data.name.trim()) {
      errors.name = "Company Name is required";
    }
    if (!data.address) {
      errors.address = "Category is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await postData("/company", data);
      if (response.error) {
        setError(response.error);
      } else {
        toast.success("company created successfully!");
        setTimeout(function () {
          navigate("/user/companies");
        }, 1000);
      }
    } catch (err) {
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout title="Create Company">
        <Container maxWidth="lg">
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <DynamicTextField
              id="name"
              label="Company Name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              autoComplete="name"
              autoFocus
              error={!!formErrors.name}
              helperText={formErrors.name}
            />

            <DynamicTextField
              id="address"
              label="address"
              name="address"
              value={data.address}
              onChange={handleInputChange}
              autoComplete="address"
              error={!!formErrors.address}
              helperText={formErrors.address}
            />

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Container>
      </Layout>
    </ThemeProvider>
  );
}
