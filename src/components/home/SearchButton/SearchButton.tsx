import { FC } from "react";
import Button from "@mui/material/Button";

interface IProps {
  onClickHandler: () => void;
}

const SearchButton: FC<IProps> = ({ onClickHandler }) => {
  return (
    <>
      <Button variant="contained" onClick={onClickHandler}>
        Search
      </Button>
    </>
  );
};

export default SearchButton;
