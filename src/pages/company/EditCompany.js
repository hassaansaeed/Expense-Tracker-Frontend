import React, { useEffect, useState } from "react";
import { Box, Container, Button, Typography } from "@mui/material";
import { fetchData, putData, updateData } from "../../utils/apiUtils"; // updateData for PUT requests
import Layout from "../../components/Layout";
import DynamicTextField from "../../components/DynamicTextField";
import DynamicSelectBox from "../../components/DynamicSelectBox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import MultiSelectComponent from "../../components/MultiSelectComponent";

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

export default function EditCompany() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    amount: "",
    address: "",
    users: [],
    company_id: uuid,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchExpenseData = async () => {
      setLoading(true);
      try {
        const [users, expenseResponse] = await Promise.all([
          fetchData(`/company/add/users/${uuid}`),
          fetchData(`/company/${uuid}`),
        ]);

        const usersError = users.error;
        const expenseError = expenseResponse.error;

        if (usersError || expenseError) {
        } else {
          setUsers(users.data);
          setData(expenseResponse.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenseData();
  }, [uuid]);

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
      errors.name = "Name is required";
    }

    if (!data.address) {
      errors.address = "Address is required";
    }
    return errors;
  };

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserSelection = (selectedUUIDs) => {
    const usersSelected = selectedUUIDs.map((user) => user.uuid);
    setSelectedUsers(usersSelected);
    setData((prevData) => ({
      ...prevData,
      users: usersSelected,
    }));
  };
  console.log("Selected Users UUIDs:", "data", data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await putData(`/company/${uuid}`, data); // Send PUT request
      if (response.error) {
        setError(response.error);
      } else {
        // console.log("still here");
        navigate("/user/companies");
      }
    } catch (err) {
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout title="Edit Company">
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
              label="Address"
              name="addresss"
              value={data.address}
              onChange={handleInputChange}
              autoComplete="address"
              autoFocus
              error={!!formErrors.address}
              helperText={formErrors.address}
            />

            {/* <MultiSelectComponent
              label="Select Users"
              options={users}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}`
              }
              onSelectionChange={handleUserSelection} // selectedUsers
            /> */}

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
