import { Button, TextField, TableRow, TableCell } from "@mui/material";
import React, { useState } from "react";

export function PaintAvailabilityRow({ item, user, fetchDataFunc }) {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const sendUpdatedQuantity = (newQuantity) => {
    fetch(`http://localhost:3000/paints/${item.colour}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })
        .then((response) => response.json())
        .then(fetchDataFunc);
  }

  const onHandleSubtraction = (operation) => {
    const quantityNum = Number(quantity);
    const litres = Number(item.litres);

    // should handle case where quantityNum > litres. It should throw an error.
    sendUpdatedQuantity(litres - quantityNum);
  };

  const onHandleAddition = () => {
    const quantityNum = Number(quantity);
    const litres = Number(item.litres);

    // should handle case where quantityNum > litres. It should throw an error.
    sendUpdatedQuantity(litres + quantityNum);
  };

  return (
    <TableRow key={item.colour}>
      <TableCell component="th" scope="row">
        {item.colour}
      </TableCell>
      <TableCell>{item.status}</TableCell>
      <TableCell>{item.litres}</TableCell>
      {user !== "JOHN" && (
        <TableCell>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={quantity}
            onChange={handleQuantityChange}
            type="number"
          />
          {user === "JANE" && (
            <Button variant="contained" sx={{ margin: 1 }} onClick={onHandleAddition}>
              Add
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ margin: 1 }}
            onClick={onHandleSubtraction}
          >
            Subtract
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
}
