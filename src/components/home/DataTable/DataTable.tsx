import { FC, useMemo } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Pagination } from "@mui/material";

import { columns } from "./utils/config";
import { ApiResponse } from "../../../interfaces/redux-actions";

interface IProps {
  data: ApiResponse;
  page: number;
  handlePageChange: (newPage: number) => void;
  handleRowClick: (row: any) => void;
}

const DataTable: FC<IProps> = ({
  data,
  page,
  handlePageChange,
  handleRowClick,
}) => {
  const { totalResults } = data;

  const setRows = useMemo(() => {
    if (data) {
      const { Search } = data;

      const newRows = Search?.map((movie) => {
        const { imdbID, Title, Year, Type, Poster } = movie;

        return { id: imdbID, Title, Year, Type, Poster };
      });

      return newRows || [];
    }

    return [];
  }, [data]);

  return (
    <>
      {setRows.length === 0 && <p>No results found</p>}

      {data && setRows.length > 0 && (
        <Box width="100%">
          <DataGrid
            rows={setRows}
            columns={columns}
            onRowClick={handleRowClick}
            getRowHeight={() => 250}
            hideFooter
            sx={{
              "& .MuiDataGrid-virtualScroller": {
                minHeight: "250px",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },

              "& .MuiDataGrid-cell:focus-within": {
                outline: "none",
              },
            }}
            disableRowSelectionOnClick
          />
          <Pagination
            count={Math.ceil(Number(totalResults) / 10)}
            page={page}
            onChange={(_, newPage) => handlePageChange(newPage)}
            sx={{
              marginTop: "24px",
              "& .MuiPagination-ul": {
                justifyContent: "center",
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default DataTable;
