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
import { DynamicTableProps } from "./DynamicTable.type";
import { capitalizeFirstLetter } from "../../../data/utils/CapitalizeFirstLetter";
import {
  tableCellStyle,
  statusIndicatorStyle,
  imageStyle,
  starsStyle,
  tableStyle,
  flexContainerStyle,
} from "./DynamicTable.style";
import colors from "../../../data/colors";

const DynamicTable: React.FC<DynamicTableProps> = ({ fields, data }) => {
  const getStatusColor = (status: string) => {
    return status === "active" ? colors.green : colors.red;
  };

  const renderTableCellContent = (field: string, rowData: any) => {
    switch (field) {
      case "status":
        return (
          <div style={flexContainerStyle}>
            <div
              style={statusIndicatorStyle(getStatusColor(rowData[field]))}
            ></div>
            {rowData[field]}
          </div>
        );
      case "restaurants":
      case "ingredients":
      case "dishes":
        return (
          Array.isArray(rowData[field]) && (
            <ul>
              {rowData[field].map((item: any, index: number) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          )
        );
      case "image":
        return <img src={rowData[field]} alt={`Image`} style={imageStyle} />;
      case "stars":
        return <img src={rowData[field]} alt={`Stars`} style={starsStyle} />;
      default:
        return typeof rowData[field] === "object"
          ? rowData[field].name
          : rowData[field];
    }
  };

  const filteredFields = fields.filter(
    (field) => field !== "_id" && field !== "__v"
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow>
            {filteredFields.map((field, index) => (
              <TableCell key={index} style={tableCellStyle}>
                {capitalizeFirstLetter(field)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {filteredFields.map((field, cellIndex) => (
                <TableCell key={cellIndex}>
                  {renderTableCellContent(field, row)}
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
