import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { TableData } from "./Dashboard";

interface DynamicTableProps {
  fields: string[];
  data: TableData[];
}

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const DynamicTable: React.FC<DynamicTableProps> = ({ fields, data }) => {
  console.log("Fields:", fields);
  console.log("Data:", data);

  const getStatusColor = (status: string) => {
    return status === "active" ? "green" : "red";
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
        <TableHead>
          <TableRow>
            {fields.map((field, index) => (
              <TableCell key={index} style={{ color: "black" }}>
                {capitalizeFirstLetter(field)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {fields.map((field, cellIndex) => (
                <TableCell key={cellIndex}>
                  {field === "status" ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          marginRight: "5px",
                          backgroundColor: getStatusColor(row[field]),
                        }}
                      ></div>
                      {row[field]}
                    </div>
                  ) : field === "restaurants" && Array.isArray(row[field]) ? (
                    <ul>
                      {row[field].map(
                        (restaurant: any, restaurantIndex: number) => (
                          <li key={restaurantIndex}>{restaurant.name}</li>
                        )
                      )}
                    </ul>
                  ) : field === "ingredients" && Array.isArray(row[field]) ? (
                    <ul>
                      {row[field].map(
                        (ingredient: any, ingredientIndex: number) => (
                          <li key={ingredientIndex}>{ingredient}</li>
                        )
                      )}
                    </ul>
                  ) : field === "dishes" && Array.isArray(row[field]) ? (
                    <ul>
                      {row[field].map((dish: any, dishIndex: number) => (
                        <li key={dishIndex}>{dish.name}</li>
                      ))}
                    </ul>
                  ) : field === "image" ? (
                    <img
                      src={row[field]}
                      alt={`Image ${rowIndex}`}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : field === "stars" ? (
                    <img
                      src={row[field]}
                      alt={`Stars ${rowIndex}`}
                      style={{ width: "50px", height: "20px" }}
                    />
                  ) : typeof row[field] === "object" ? (
                    row[field].name
                  ) : (
                    row[field]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
