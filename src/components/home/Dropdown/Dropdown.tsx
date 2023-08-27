import { FC } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, FormControl } from "@mui/material";

interface IProps {
  value: string;
  onChangeHandler: (event: string) => void;
}

const Dropdown: FC<IProps> = ({ value, onChangeHandler }) => {
  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Age"
            onChange={(e: SelectChangeEvent) =>
              onChangeHandler(e.target.value as string)
            }
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Movie">Movie</MenuItem>
            <MenuItem value="Series">Series</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default Dropdown;
