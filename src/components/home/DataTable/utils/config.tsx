import {
  GridCellParams,
  GridColDef,
  GridSingleSelectColDef,
} from "@mui/x-data-grid";

const imageCellRenderer = (params: GridCellParams) => {
  const notFoundPoster = "https://i.stack.imgur.com/y9DpT.jpg";

  return (
    <img
      src={
        (params.value as string).toString() === "N/A"
          ? notFoundPoster
          : (params.value as string)
      }
      alt="Poster"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        maxWidth: "225px",
        maxHeight: "225px",
      }}
    />
  );
};

const commonColumnProps: GridSingleSelectColDef = {
  headerAlign: "center",
  align: "center",
  type: "singleSelect",
  field: "",
};

export const columns: GridColDef[] = [
  {
    ...commonColumnProps,
    field: "id",
    headerName: "IMDB ID",
    flex: 0.5,
    type: "string",
  },
  {
    ...commonColumnProps,
    field: "Poster",
    headerName: "Poster",
    flex: 1,
    type: "string",
    renderCell: imageCellRenderer,
  },
  {
    ...commonColumnProps,
    field: "Title",
    headerName: "Title",
    flex: 1,
    type: "string",
  },
  {
    ...commonColumnProps,
    field: "Year",
    headerName: "Year",
    flex: 0.5,
    type: "string",
  },
  {
    ...commonColumnProps,
    field: "Type",
    headerName: "Type",
    flex: 0.5,
    type: "string",
  },
];
