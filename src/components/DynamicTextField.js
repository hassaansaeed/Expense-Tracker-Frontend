import React from "react";
import { TextField } from "@mui/material";

const DynamicTextField = ({
  id,
  label,
  name,
  type = "text",
  value,
  onChange,
  ...rest
}) => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      {...rest} // for any other props you might want to pass
    />
  );
};

export default DynamicTextField;
