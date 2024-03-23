import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectionMenu({ users, user, handleChange }) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="user">User</InputLabel>
        <Select
          labelId="a-paint-company-user-label"
          id="a-paint-company-user-select"
          value={user}
          label="User"
          onChange={handleChange}
        >
        {users.map((user) => (
            <MenuItem value={user}>{user}</MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  );
}
