import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { fetchData, postData } from "../../utils/apiUtils";
import Layout from "../../components/Layout";
import DynamicTextField from "../../components/DynamicTextField";
import DynamicSelectBox from "../../components/DynamicSelectBox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    amount: "",
    start_date: "",
    end_date: "",
    category_id: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const [categoryResponse] = await Promise.all([fetchData("/category")]);

        const categoryError = categoryResponse.error;
        if (categoryError) {
          setError(categoryError);
        } else {
          setCategories(categoryResponse.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const categoryOptions = categories.map((category) => ({
    value: category.uuid,
    label: category.name,
  }));

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
      errors.name = "Expense Name is required";
    }
    if (!data.amount.trim()) {
      errors.amount = "Amount is required";
    } else if (isNaN(data.amount) || parseFloat(data.amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }
    if (!data.category_id) {
      errors.category_id = "Category is required";
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
      const response = await postData("/budget", data);
      if (response.error) {
        setError(response.error);
      } else {
        navigate("/user/budget");
      }
    } catch (err) {
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout title="Create Budget">
        <Container maxWidth="lg">
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <DynamicTextField
              id="name"
              label="Budget Name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              autoComplete="name"
              autoFocus
              error={!!formErrors.name}
              helperText={formErrors.name}
            />

            <DynamicTextField
              id="description"
              label="Description"
              name="description"
              value={data.description}
              onChange={handleInputChange}
              autoComplete="description"
              autoFocus
              error={!!formErrors.description}
              helperText={formErrors.description}
            />

            <DynamicTextField
              id="amount"
              label="Amount"
              name="amount"
              value={data.amount}
              onChange={handleInputChange}
              autoComplete="amount"
              error={!!formErrors.amount}
              helperText={formErrors.amount}
            />

            <DynamicTextField
              id="start_date"
              label="Start Date"
              name="start_date"
              value={data.start_date}
              onChange={handleInputChange}
              autoComplete="start_date"
              error={!!formErrors.start_date}
              helperText={formErrors.start_date}
              type="date"
            />
            <DynamicTextField
              id="end_date"
              label="End Date"
              name="end_date"
              value={data.end_date}
              onChange={handleInputChange}
              autoComplete="end_date"
              error={!!formErrors.end_date}
              helperText={formErrors.end_date}
              type="date"
            />

            <DynamicSelectBox
              id="category_id"
              label="Category"
              name="category_id"
              value={data.category_id}
              onChange={handleInputChange}
              options={categoryOptions}
              error={!!formErrors.category_id}
              helperText={formErrors.category_id}
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
