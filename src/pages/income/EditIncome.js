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

export default function EditIncome() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the income ID from the route parameters
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
    const fetchIncome = async () => {
      try {
        const { data: incomeData, error: incomeError } = await fetchData(
          `/income/${id}`
        );
        setLoading(false);
        if (incomeError) {
          setError(incomeError);
        } else {
          setData(incomeData);

          const date = new Date(incomeData.date).toISOString().split("T")[0];

          setData({
            ...incomeData,
            date: date,
          });
        }
      } catch (err) {
        setError("Error fetching income data.");
        setLoading(false);
      }
    };
    fetchIncome();
  }, [id]);

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
    if (!String(data.amount).trim()) {
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
      const response = await putData(`/income/${id}`, data);
      if (response.error) {
        setError(response.error);
      } else {
        navigate("/user/income");
        console.log("Income updated successfully");
      }
    } catch (err) {
      setError("An error occurred while submitting the form.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;

  return (
    <ThemeProvider theme={theme}>
      <Layout title="Edit Income">
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
              label="Date"
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
