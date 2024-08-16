// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from '../axiosConfig';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Add Expense
        </Button>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <Box key={expense._id} sx={{ mb: 2 }}>
              <Typography>
                {expense.category}: ${expense.amount}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>No expenses found.</Typography>
        )}
      </Box>
    </Container>
  );
}

export default Dashboard;
