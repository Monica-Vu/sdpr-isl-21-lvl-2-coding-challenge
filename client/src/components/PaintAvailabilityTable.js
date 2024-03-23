import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function PaintAvailabilityTable({ data, user }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="paints availability table">
        <TableHead>
          <TableRow>
            <TableCell>Colour</TableCell>
            <TableCell>Litres Available</TableCell>
            {user !== "JOHN" && <TableCell>Edit Quantity</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.colour}>
                <TableCell component="th" scope="row">
                  {item.colour}
                </TableCell>
                <TableCell>{item.litres}</TableCell>
                {user !== "JOHN" && <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                  {user === "JANE" && <Button variant="contained" sx={{ margin: 1 }}>
                    Add
                  </Button>}
                  <Button variant="contained" sx={{ margin: 1 }}>Subtract</Button>
                </TableCell>}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
