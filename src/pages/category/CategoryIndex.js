import React, { useEffect, useState } from "react";
import { Box, Container, Button, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import { fetchData } from "../../utils/apiUtils";
import TableComponent from "../../components/TableComponent";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 170,
    align: "right",
    format: (value) =>
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date(value)),
  },
];

export default function Index() {
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await fetchData("/category");
      setLoading(false);
      if (error) {
        setError(error);
      } else {
        setExpenses(data);
      }
    };
    fetchExpenses();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEdit = (id) => {
    navigate(`/user/category/edit/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;

  return (
    <Layout title="Categories">
      <Container maxWidth="lg">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#111827",
            marginBottom: "10px",
            float: "right",
            "&:hover": {
              backgroundColor: "#333", // Change this to your desired hover color
            },
          }}
          onClick={() => navigate("/user/category/create")}
        >
          + Add Category
        </Button>

        <TableComponent
          columns={columns}
          data={expenses}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          onEdit={handleEdit}
        />
      </Container>
    </Layout>
  );
}
