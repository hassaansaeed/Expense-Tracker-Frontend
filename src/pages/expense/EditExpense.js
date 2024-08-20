import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { fetchData, putData, updateData } from "../../utils/apiUtils"; // updateData for PUT requests
import Layout from "../../components/Layout";
import DynamicTextField from "../../components/DynamicTextField";
import DynamicSelectBox from "../../components/DynamicSelectBox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";

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

export default function EditExpense() {
  const { id } = useParams();
  const uuid = id;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    amount: "",
    category_id: "",
    budget_id: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchExpenseData = async () => {
      setLoading(true);
      try {
        const [categoryResponse, budgetResponse, expenseResponse] =
          await Promise.all([
            fetchData("/category"),
            fetchData("/budget"),
            fetchData(`/expense/${uuid}`), // Fetch the existing expense data
          ]);

        const categoryError = categoryResponse.error;
        const budgetError = budgetResponse.error;
        const expenseError = expenseResponse.error;

        if (categoryError || budgetError || expenseError) {
          setError(categoryError || budgetError || expenseError);
        } else {
          setCategories(categoryResponse.data);
          setBudgets(budgetResponse.data);
          setData(expenseResponse.data); // Prepopulate the form with existing data
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenseData();
  }, [uuid]);

  const categoryOptions = categories.map((category) => ({
    value: category.uuid,
    label: category.name,
  }));

  const budgetOptions = budgets.map((budget) => ({
    value: budget.uuid,
    label: budget.name,
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
    if (!data.budget_id) {
      errors.budget_id = "Budget is required";
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
      const response = await putData(`/expense/${uuid}`, data); // Send PUT request
      if (response.error) {
        setError(response.error);
      } else {
        navigate("/user/expenses");
      }
    } catch (err) {
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout title="Edit Expense">
        <Container maxWidth="lg">
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <DynamicTextField
              id="name"
              label="Expense Name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              autoComplete="name"
              autoFocus
              error={!!formErrors.name}
              helperText={formErrors.name}
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

            <DynamicSelectBox
              id="budget_id"
              label="Budget"
              name="budget_id"
              value={data.budget_id}
              onChange={handleInputChange}
              options={budgetOptions}
              error={!!formErrors.budget_id}
              helperText={formErrors.budget_id}
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
              Update
            </Button>
          </Box>
        </Container>
      </Layout>
    </ThemeProvider>
  );
}
