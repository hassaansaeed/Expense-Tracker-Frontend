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

export default function CreateExpense() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [userCompanies, setUserCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    amount: "",
    categoryUuid: "",
    budgetUuid: "",
    companyUuid: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const authUser = JSON.parse(localStorage.getItem("user"));
  const userRole = authUser?.role;

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const [categoryResponse, budgetResponse] = await Promise.all([
          fetchData("/category"),
          fetchData("/budget"),
        ]);

        if (categoryResponse.error || budgetResponse.error) {
          setError(categoryResponse.error || budgetResponse.error);
        } else {
          setCategories(categoryResponse.data);
          setBudgets(budgetResponse.data);

          if (userRole === "company") {
            const userResponse = await fetchData("/company");
            if (!userResponse.error) {
              setUserCompanies(userResponse.data);
            } else {
              setError(userResponse.error);
            }
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [userRole]); // Add userRole to the dependency array

  const categoryOptions = categories.map((category) => ({
    value: category.uuid,
    label: category.name,
  }));

  const budgetOptions = budgets.map((budget) => ({
    value: budget.uuid,
    label: budget.name,
  }));

  const companyOptions = userCompanies.map((company) => ({
    value: company.uuid,
    label: company.name,
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
    if (!data.categoryUuid) {
      errors.categoryUuid = "Category is required";
    }
    if (!data.budgetUuid) {
      errors.budgetUuid = "Budget is required";
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
      const response = await postData("/expense", data);
      if (response.error) {
        setError(response.error);
      } else {
        toast.success("Expense created successfully!"); // Show success toast
        setTimeout(function () {
          navigate("/user/expenses");
        }, 1000);
      }
    } catch (err) {
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout title="Create Expense">
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
              id="categoryUuid"
              label="Category"
              name="categoryUuid"
              value={data.categoryUuid}
              onChange={handleInputChange}
              options={categoryOptions}
              error={!!formErrors.categoryUuid}
              helperText={formErrors.categoryUuid}
            />

            <DynamicSelectBox
              id="budgetUuid"
              label="Budget"
              name="budgetUuid"
              value={data.budgetUuid}
              onChange={handleInputChange}
              options={budgetOptions}
              error={!!formErrors.budgetUuid}
              helperText={formErrors.budgetUuid}
            />

            {userRole === "company" && (
              <DynamicSelectBox
                id="companyUuid"
                label="Company"
                name="companyUuid"
                value={data.companyUuid}
                onChange={handleInputChange}
                options={companyOptions}
                error={!!formErrors.companyUuid}
                helperText={formErrors.companyUuid}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Expense
            </Button>

            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Container>
      </Layout>
    </ThemeProvider>
  );
}
