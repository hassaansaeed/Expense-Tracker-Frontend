import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { PieChart, BarChart, LineChart } from "@mui/x-charts";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [dataReady, setDataReady] = useState(false);
  const [expenses, setExpenses] = useState([10, 20, 30]); // Dummy values
  const [incomes, setIncomes] = useState([15, 25, 35]); // Dummy values
  const [budgets, setBudgets] = useState([20, 30, 40]); // Dummy values

  useEffect(() => {
    // Mimicking a delay as if fetching data
    setTimeout(() => {
      setDataReady(true);
    }, 1000);
  }, []);

  if (!dataReady) return <div>Loading...</div>;

  return (
    <Layout title="Dashboard">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* Expenses Chart */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" align="center">
              Expenses
            </Typography>
            <PieChart
              series={[
                {
                  data: expenses.map((value, index) => ({ id: index, value })),
                },
              ]}
              width={300}
              height={300}
            />
          </Grid>

          {/* Incomes Chart */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" align="center">
              Incomes
            </Typography>
            <BarChart
              series={[
                { data: incomes.map((value, index) => ({ id: index, value })) },
              ]}
              width={300}
              height={300}
            />
          </Grid>

          {/* Budgets Chart */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" align="center">
              Budgets
            </Typography>
            <LineChart
              series={[
                { data: budgets.map((value, index) => ({ id: index, value })) },
              ]}
              width={300}
              height={300}
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
