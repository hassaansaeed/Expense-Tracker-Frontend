import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { fetchData, putData } from "../../utils/apiUtils";
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

export default function EditBudget() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchCategoriesAndBudget = async () => {
      setLoading(true);
      try {
        const [categoryResponse, budgetResponse] = await Promise.all([
          fetchData("/category"),
          fetchData(`/budget/${id}`),
        ]);

        if (categoryResponse.error) {
          setError(categoryResponse.error);
        } else {
          setCategories(categoryResponse.data);
        }

        if (budgetResponse.error) {
          setError(budgetResponse.error);
        } else {
          const budgetData = budgetResponse.data;
          const startDate = new Date(budgetData.start_date)
            .toISOString()
            .split("T")[0];
          const endDate = new Date(budgetData.end_date)
            .toISOString()
            .split("T")[0];

          setBudget({
            ...budgetData,
            start_date: startDate,
            end_date: endDate,
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoriesAndBudget();
  }, [id]);

  const categoryOptions = categories.map((category) => ({
    value: category.uuid,
    label: category.name,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "start_date" || name === "end_date") {
      const dateValue = new Date(value).toISOString().split("T")[0];
      setBudget((prev) => ({
        ...prev,
        [name]: dateValue,
      }));
    } else {
      setBudget((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!budget.name?.trim()) {
      errors.name = "Expense Name is required";
    }
    if (!budget.amount?.trim()) {
      errors.amount = "Amount is required";
    } else if (isNaN(budget.amount) || parseFloat(budget.amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }
    if (!budget.category_id) {
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
      const response = await putData(`/budget/${id}`, budget);
      if (response.error) {
        setError(response.error);
      } else {
        navigate("/user/budget");
      }
    } catch (err) {
      setError("An error occurred while submitting the form.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;

  return (
    <ThemeProvider theme={theme}>
      <Layout title="Edit Budget">
        <Container maxWidth="lg">
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <DynamicTextField
              id="name"
              label="Budget Name"
              name="name"
              value={budget?.name || ""}
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
              value={budget?.description || ""}
              onChange={handleInputChange}
              autoComplete="description"
              error={!!formErrors.description}
              helperText={formErrors.description}
            />

            <DynamicTextField
              id="amount"
              label="Amount"
              name="amount"
              value={budget?.amount || ""}
              onChange={handleInputChange}
              autoComplete="amount"
              error={!!formErrors.amount}
              helperText={formErrors.amount}
            />

            <DynamicTextField
              id="start_date"
              label="Start Date"
              name="start_date"
              value={budget?.start_date || ""}
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
              value={budget?.end_date || ""}
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
              value={budget?.category_id || ""}
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
