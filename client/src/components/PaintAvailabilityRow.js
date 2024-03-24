import { Button, TextField, TableRow, TableCell } from "@mui/material";
import React, { useState } from "react";
import "./PaintAvailabilityRow.css";

export function PaintAvailabilityRow({ item, user, fetchDataFunc }) {
  const [quantity, setQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState(false);

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
  };

  const onHandleSubtraction = () => {
    const quantityNum = Number(quantity);
    const litres = Number(item.litres);

    if (litres >= quantityNum) {
      sendUpdatedQuantity(litres - quantityNum);
      setQuantityError(false);
    } else {
      setQuantityError(true);
    }
  };

  const onHandleAddition = () => {
    const quantityNum = Number(quantity);
    const litres = Number(item.litres);

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
            sx={{ width: '25ch' }}
            className="text-field-limited"
            id="paint-quantity"
            variant="outlined"
            value={quantity}
            onChange={handleQuantityChange}
            type="number"
            error={quantityError}
            helperText={
              quantityError &&
              `Cannot have paint quantity greater than current availability. Enter a number less than or equal to ${item.litres}`
            }
          />
          {user === "JANE" && (
            <Button
              variant="contained"
              sx={{ margin: 1 }}
              onClick={onHandleAddition}
            >
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
