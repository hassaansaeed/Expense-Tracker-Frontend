import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedItems, theme) {
  return {
    fontWeight: selectedItems.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const MultiSelectComponent = ({
  label,
  options,
  getOptionLabel,
  onSelectionChange,
}) => {
  const theme = useTheme();
  const [selectedItems, setSelectedItems] = React.useState([]);

  // This effect ensures that default selected items are set when options are available
  React.useEffect(() => {
    const defaultSelectedUsers = options
      .filter((user) => user.company_uuid) // Filter users with company_uuid
      .map((user) => user.uuid); // Extract their UUIDs

    setSelectedItems(defaultSelectedUsers);
  }, [options]); // Runs when options change

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const selectedUsers = typeof value === "string" ? value.split(",") : value;
    setSelectedItems(selectedUsers);

    // Pass the selected user objects to the parent component
    onSelectionChange(
      selectedUsers.map((uuid) => options.find((user) => user.uuid === uuid))
    );
  };

  return (
    <div>
      <FormControl sx={{ mt: 1, width: "100%" }}>
        <InputLabel id="multi-select-chip-label">{label}</InputLabel>
        <Select
          labelId="multi-select-chip-label"
          id="multi-select-chip"
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const user = options.find((option) => option.uuid === value);
                return <Chip key={value} label={getOptionLabel(user)} />;
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option.uuid}
              value={option.uuid}
              style={getStyles(option.uuid, selectedItems, theme)}
            >
              {getOptionLabel(option)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelectComponent;
