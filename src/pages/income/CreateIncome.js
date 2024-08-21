import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { fetchData, postData } from "../../utils/apiUtils";
import Layout from "../../components/Layout";
import DynamicTextField from "../../components/DynamicTextField";
import DynamicSelectBox from "../../components/DynamicSelectBox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the toastify CSS
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

export default function CreateIncome() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    amount: "",
    source: "",
    date: "",
    currency: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const currencyOptions = ["PKR", "USD", "EURO", "GBP", "DIRHAM"];

  const currencies = currencyOptions.map((currency) => ({
    value: currency,
    label: currency,
  }));

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await fetchData("/income");
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
      errors.name = "Income Name is required";
    }
    if (!data.description.trim()) {
      errors.description = "Description is required";
    }
    if (!data.amount.trim()) {
      errors.amount = "Amount is required";
    } else if (isNaN(data.amount) || parseFloat(data.amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }

    if (!data.currency.trim()) {
      errors.currency = "Currency is required";
    }
    if (!data.source.trim()) {
      errors.source = "Source is required";
    }

    if (!data.date) {
      errors.date = "Date is required";
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
      const response = await postData("/income", data);
      if (response.error) {
        const errorMessage =
          response.error.message || "An unknown error occurred.";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.success("Income created successfully!"); // Show success toast
        setTimeout(function () {
          navigate("/user/income");
        }, 1000);
      }
    } catch (err) {
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout title="Create Income">
        <Container maxWidth="lg">
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <DynamicTextField
              id="name"
              label="Income Name"
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

            <DynamicSelectBox
              id="currency"
              label="Currency"
              name="currency"
              value={data.currency}
              onChange={handleInputChange}
              options={currencies}
              error={!!formErrors.currency}
              helperText={formErrors.currency}
            />

            <DynamicTextField
              id="source"
              label="Source"
              name="source"
              value={data.source}
              onChange={handleInputChange}
              autoComplete="source"
              error={!!formErrors.source}
              helperText={formErrors.source}
            />

            <DynamicTextField
              id="date"
              label=""
              name="date"
              type="date"
              value={data.date}
              onChange={handleInputChange}
              error={!!formErrors.date}
              helperText={formErrors.date}
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
