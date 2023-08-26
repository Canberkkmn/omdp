import { Typography } from "@mui/material";
import { FC } from "react";

const Header: FC = () => {
  return (
    <Typography
      variant="h4"
      sx={{
        textAlign: "center",
      }}
    >
      OMDb Data Table
    </Typography>
  );
};

export default Header;
