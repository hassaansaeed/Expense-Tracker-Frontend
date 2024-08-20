import React from "react";
import { TextField, MenuItem } from "@mui/material";

const DynamicSelectBox = ({
  id,
  label,
  name,
  value,
  onChange,
  options,
  error,
  helperText,
}) => (
  <TextField
    id={id}
    select
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    fullWidth
    error={error}
    helperText={helperText}
    sx={{
      marginBottom: "20px",
    }}
  >
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

export default DynamicSelectBox;
