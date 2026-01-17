import * as React from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getSellers } from "client";
import { TableCell, TableHead } from "./styles";

const SellersTable = () => {
  const { campaignId = "" } = useParams();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [sellers, setSellers] = React.useState<any>([]);
  const [totalRows, setTotalRows] = React.useState(0);

  const handleChangePage = async (event: unknown, newPage: number) => {
    const { data, totalRows } = await getSellers(
      campaignId,
      rowsPerPage,
      newPage
    );
    setPage(newPage);
    setSellers(data);
    setTotalRows(totalRows);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);

    if (newRowsPerPage * page > totalRows) {
      setPage(0);
      const { data } = await getSellers(campaignId, newRowsPerPage, 0);
      setSellers(data);
    } else {
      const { data } = await getSellers(campaignId, newRowsPerPage, page);
      setSellers(data);
    }
  };

  React.useEffect(() => {
    (async () => {
      const { data, totalRows } = await getSellers(
        campaignId,
        rowsPerPage,
        page
      );
      setSellers(data);
      setTotalRows(totalRows);
    })();
  }, []);

  return (
    <>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Vendedor</TableCell>
              <TableCell align="center">Rifas vendidas</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.map((row: any) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.sales}</TableCell>
                <TableCell align="right">
                  <button>Remover</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ display: totalRows < 5 ? "none" : "" }}
        rowsPerPageOptions={[3, 5, 7]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SellersTable;
