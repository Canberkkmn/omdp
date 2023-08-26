import { ChangeEvent, FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface IProps {
  type: "title" | "year";
  value: string;
  onChangeHandler: (newValue: string) => void;
}

const Filter: FC<IProps> = ({ type, value, onChangeHandler }) => {
  return (
    <Box>
      <TextField
        id={type}
        label={type}
        variant="standard"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChangeHandler(e.target.value);
        }}
        value={value}
      />
    </Box>
  );
};

export default Filter;
