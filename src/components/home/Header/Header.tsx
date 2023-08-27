import { Typography } from "@mui/material";
import { FC } from "react";

interface IProps {
  value?: string;
}

const Header: FC<IProps> = ({ value }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        textAlign: "center",
      }}
    >
      {value}
    </Typography>
  );
};

export default Header;
