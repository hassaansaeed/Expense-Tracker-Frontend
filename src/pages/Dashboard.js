import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import Layout from "../components/Layout";
import { fetchData } from "../utils/apiUtils";
import ExpenseByCategoryChart from "../components/ExpenseByCategoryChart";
import ExpenseDoughnutChart from "../components/ExpenseDoughnutChart"; // Import the new Doughnut Chart
import IncomeSourceWiseLineChart from "../components/IncomeSourceWiseLineChart"; // Import the new Line Chart

export default function Dashboard() {
  const [expenseData, setExpenseData] = useState([]);
  const [expenseCategoryWiseData, SetExpenseCategoryWiseData] = useState([]);
  const [incomeSourceWiseData, setIncomeSourceWiseData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpensesBudgets = async () => {
      try {
        const [
          expenseResponse,
          budgetResponse,
          incomeSourceWiseResponse,
          expenseCategoryWiseResponse,
        ] = await Promise.all([
          fetchData("/report/expenses/total"),
          fetchData("/budget"),
          fetchData("/report/income/source-wise"),
          fetchData("/report/expenses/category-wise"),
        ]);

        if (
          expenseResponse.error ||
          budgetResponse.error ||
          incomeSourceWiseResponse.error ||
          expenseCategoryWiseResponse.error
        ) {
          setError(
            expenseResponse.error ||
              budgetResponse.error ||
              incomeSourceWiseResponse.error ||
              expenseCategoryWiseResponse.error
          );
        } else {
          setExpenseData(expenseResponse.data);
          setBudgetData(budgetResponse.data);
          setIncomeSourceWiseData(incomeSourceWiseResponse.data);
          SetExpenseCategoryWiseData(expenseCategoryWiseResponse.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpensesBudgets();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  const chartColors = ["#3f51b5", "#f50057", "#4caf50"];
  const chartStyles = {
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    backgroundColor: "#fff",
  };

  if (loading) {
    return (
      <Layout title="Dashboard">
        <Container maxWidth="lg">
          <CircularProgress />
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Dashboard">
        <Container maxWidth="lg">
          <Typography color="error">{error}</Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Expenses Doughnut Chart */}
          <Grid item xs={12} sm={6} md={4}>
            <Box style={chartStyles}>
              <Typography variant="h6" align="center" gutterBottom>
                Expenses
              </Typography>
              <ExpenseDoughnutChart data={expenseData} options={chartOptions} />
            </Box>
          </Grid>

          {/* Expenses Category Wise */}
          <Grid item xs={12} sm={6} md={4}>
            <Box style={chartStyles}>
              <Typography variant="h6" align="center" gutterBottom>
                Expenses Category Wise
              </Typography>
              <ExpenseByCategoryChart data={expenseCategoryWiseData} />
            </Box>
          </Grid>

          {/* Income Source Wise */}
          <Grid item xs={12} sm={6} md={4}>
            <Box style={chartStyles}>
              <Typography variant="h6" align="center" gutterBottom>
                Income Source Wise
              </Typography>
              <IncomeSourceWiseLineChart data={incomeSourceWiseData} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
