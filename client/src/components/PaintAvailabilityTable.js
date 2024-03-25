import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PaintAvailabilityRow } from "./PaintAvailabilityRow/PaintAvailabilityRow";

export default function PaintAvailabilityTable({ data, user, fetchDataFunc }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="paints availability table">
        <TableHead>
          <TableRow>
            <TableCell>Colour</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Litres Available</TableCell>
            {user !== "JOHN" && <TableCell>Edit Quantity</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            return (
            <PaintAvailabilityRow item={item} user={user} fetchDataFunc={fetchDataFunc} />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
