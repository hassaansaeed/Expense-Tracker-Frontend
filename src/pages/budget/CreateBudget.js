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

export default function CreateBudget() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [userCompanies, setUserCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    amount: "",
    startDate: "",
    endDate: "",
    categoryUuid: "",
    companyUuid: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const authUser = JSON.parse(localStorage.getItem("user"));
  const userRole = authUser?.role;

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const [categoryResponse] = await Promise.all([fetchData("/category")]);

        if (categoryResponse.error) {
          setError(categoryResponse.error);
        } else {
          setCategories(categoryResponse.data);
        }

        if (userRole === "company") {
          const userResponse = await fetchData("/company");
          if (!userResponse.error) {
            setUserCompanies(userResponse.data);
          } else {
            setError(userResponse.error);
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [userRole]);

  const categoryOptions = categories.map((category) => ({
    value: category.uuid,
    label: category.name,
  }));

  const userOptions = userCompanies.map((company) => ({
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
      errors.name = "Budget Name is required";
    }
    if (!data.amount.trim()) {
      errors.amount = "Amount is required";
    } else if (isNaN(data.amount) || parseFloat(data.amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }
    if (!data.categoryUuid) {
      errors.categoryUuid = "Category is required";
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
        toast.error(response.error.message || "An error occurred");
        setError(response.error.message || "An error occurred");
      } else {
        toast.success("Budget created successfully!");
        setTimeout(() => {
          navigate("/user/budget");
        }, 1000);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again later.");
      setError("An unexpected error occurred. Please try again later.");
      console.error("Submission error:", err);
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
              id="startDate"
              label="Start Date"
              name="startDate"
              value={data.startDate}
              onChange={handleInputChange}
              autoComplete="startDate"
              error={!!formErrors.startDate}
              helperText={formErrors.startDate}
              type="date"
            />
            <DynamicTextField
              id="endDate"
              label="End Date"
              name="endDate"
              value={data.endDate}
              onChange={handleInputChange}
              autoComplete="endDate"
              error={!!formErrors.endDate}
              helperText={formErrors.endDate}
              type="date"
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

            {userRole === "company" && (
              <DynamicSelectBox
                id="companyUuid"
                label="Company"
                name="companyUuid"
                value={data.companyUuid}
                onChange={handleInputChange}
                options={userOptions}
                error={!!formErrors.companyUuid}
                helperText={formErrors.companyUuid}
              />
            )}

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
