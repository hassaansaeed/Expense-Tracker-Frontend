import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { fetchData, postData } from "../../utils/apiUtils";
import Layout from "../../components/Layout";
import DynamicTextField from "../../components/DynamicTextField";
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

export default function CreateCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
  });
  const [formErrors, setFormErrors] = useState({});

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
      errors.name = "Category Name is required";
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
      const response = await postData("/category", data);
      if (response.error) {
        const errorMessage =
          response.error.message || "An unknown error occurred.";
        setError(errorMessage);
        toast.error(errorMessage); // Show error toast
      } else {
        toast.success("Category created successfully!"); // Show success toast
        setTimeout(function () {
          navigate("/user/categories");
        }, 1000);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error?.message ||
        err.message ||
        "An unknown error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout title="Create Category">
        <Container maxWidth="lg">
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <DynamicTextField
              id="name"
              label="Category Name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              autoComplete="name"
              autoFocus
              error={!!formErrors.name}
              helperText={formErrors.name}
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
