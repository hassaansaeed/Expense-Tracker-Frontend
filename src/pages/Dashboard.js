import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { PieChart, BarChart, LineChart } from "@mui/x-charts";
import Layout from "../components/Layout";
import { fetchData } from "../utils/apiUtils";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpensesBudgets = async () => {
      try {
        const [expenseResponse, budgetResponse, incomeResponse] =
          await Promise.all([
            fetchData("/expense"),
            fetchData("/budget"),
            fetchData("/income"),
          ]);

        if (
          expenseResponse.error ||
          budgetResponse.error ||
          incomeResponse.error
        ) {
          setError(
            expenseResponse.error ||
              budgetResponse.error ||
              incomeResponse.error
          );
        } else {
          setExpenses(expenseResponse.data);
          setBudgets(budgetResponse.data);
          setIncomes(incomeResponse.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchExpensesBudgets();
  }, []);

  const chartColors = ["#3f51b5", "#f50057", "#4caf50"];
  const chartStyles = {
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    backgroundColor: "#fff",
  };

  return (
    <Layout title="Dashboard">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Expenses Chart */}
          <Grid item xs={12} sm={6} md={4}>
            <Box style={chartStyles}>
              <Typography variant="h6" align="center" gutterBottom>
                Expenses
              </Typography>
              <PieChart
                series={[
                  {
                    data: expenses.map((item) => ({
                      label: item.name, // Ensure that the label is the expense name
                      value: parseFloat(item.amount),
                    })),
                    colors: chartColors,
                  },
                ]}
                width={300}
                height={300}
                labels={({ datum }) => `${datum.label}: ${datum.value}`} // Ensure labels are shown
                labelComponent={
                  <text style={{ fill: "black", fontSize: 12 }} />
                } // Style the labels
                labelPosition="outside" // Position labels outside the pie slices
              />
            </Box>
          </Grid>

          {/* Incomes Chart */}
          <Grid item xs={12} sm={6} md={4}>
            <Box style={chartStyles}>
              <Typography variant="h6" align="center" gutterBottom>
                Incomes
              </Typography>
              <BarChart
                series={[
                  {
                    data: incomes.map((item) => ({
                      label: item.name, // Using the income name as the label
                      value: parseFloat(item.amount),
                    })),
                    colors: chartColors,
                  },
                ]}
                width={300}
                height={300}
                labels={({ datum }) => `${datum.label}: ${datum.value} PKR`} // Display labels with values and currency
              />
            </Box>
          </Grid>

          {/* Budgets Chart */}
          <Grid item xs={12} sm={6} md={4}>
            <Box style={chartStyles}>
              <Typography variant="h6" align="center" gutterBottom>
                Budgets
              </Typography>
              <LineChart
                series={[
                  {
                    data: budgets.map((item) => ({
                      label: item.name, // Add the name as the label
                      value: parseFloat(item.amount),
                    })),
                    colors: chartColors,
                  },
                ]}
                width={300}
                height={300}
                labels={({ datum }) => `${datum.label}: ${datum.value}`} // Display labels with values
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
