import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getSellers } from '../../../../client';

const SellersTable = () => {
  const { campaignId = '' } = useParams();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [sellers, setSellers] = React.useState<any>([]);
  const [totalRows, setTotalRows] = React.useState(0);

  // const handleChangePage = async (event: unknown, newPage: number) => {
  //   const { data, totalRows } = await getSellers(campaignId, rowsPerPage, newPage);
  //   setPage(newPage);
  //   setSellers(data);
  //   setTotalRows(totalRows);
  // };

  // const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newRowsPerPage = parseInt(event.target.value, 10);
  //   setRowsPerPage(newRowsPerPage);

  //   if (newRowsPerPage * page > totalRows) {
  //     setPage(0);
  //     const { data } = await getSellers(campaignId, newRowsPerPage, 0);
  //     setSellers(data);
  //   } else {
  //     const { data } = await getSellers(campaignId, newRowsPerPage, page);
  //     setSellers(data);
  //   }
  // };

  React.useEffect(() => {
    (async () => {
      const { data, totalRows } = await getSellers(campaignId, rowsPerPage, page);
      setSellers(data);
      setTotalRows(totalRows);
    })();
  }, []);

  return (
    <>
      <table aria-label="a dense table">
        <thead>
          <tr>
            <th>Vendedor</th>
            <th align="center">Rifas vendidas</th>
            <th align="right"></th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((row: any) => (
            <tr key={row.name}>
              <th>{row.name}</th>
              <td align="center">{row.sales}</td>
              <td align="right">
                <button>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <TablePagination
        style={{ display: totalRows < 5 ? 'none' : '' }}
        rowsPerPageOptions={[3, 5, 7]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </>
  );
};

export default SellersTable;
